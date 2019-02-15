/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lhh.server.apiserver.handler;

import com.lhh.server.apiserver.request.ClientRequest;
import com.lhh.server.apiserver.response.APIManager;
import com.lhh.server.apiserver.response.IApiAdapter;
import com.lhh.server.apiserver.response.ServerResponse;
import com.lhh.server.session.Session;
import com.lhh.server.session.SessionManager;
import com.lhh.util.Util;
import com.lhh.util.constant.ResponseCode;
import com.lhh.util.constant.ParamKey;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.eclipse.jetty.server.Request;
import org.eclipse.jetty.server.handler.AbstractHandler;

/**
 *
 * @author Linh
 */
public class ServerHandler extends AbstractHandler {

    private static final String UTF8 = "text/plain;charset=UTF-8";

    @Override
    public void handle(String string, Request rqst, HttpServletRequest hsrq, HttpServletResponse hsrs) throws IOException, ServletException {
        try {
            rqst.setHandled(true);
            hsrs.addHeader("Access-Control-Allow-Origin", "*");
            hsrs.addHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE, HEAD");
            hsrs.addHeader("Access-Control-Allow-Headers", "X-PINGOTHER, Origin, X-Requested-With, Content-Type, Accept");

            ClientRequest request = initRequest(rqst, hsrq, hsrs);

            if (request == null) {
                return;
            }

            if (request.api == null) {
                dataBack(hsrs, new ServerResponse(ResponseCode.WRONG_DATA_FORMAT));
                return;
            }

            Session session = SessionManager.getSession(request.token);
            if (session == null && !APIManager.isNonTokenApi(request.api)) {
                dataBack(hsrs, new ServerResponse(ResponseCode.INVALID_TOKEN));
                return;
            }

            if (session != null){
                request.put(ParamKey.USER_ID, session.userID);
            }
            
            ServerResponse response = null;
            IApiAdapter adapter = APIManager.getApi(request.api);
            if (adapter != null) {
                response = adapter.execute(request);
            }

            if (response == null) {
                response = new ServerResponse(ResponseCode.WRONG_DATA_FORMAT);
            }
            dataBack(hsrs, response);

        } catch (Exception ex) {
            Util.addErrorLog(ex);
        }
    }

    private void dataBack(HttpServletResponse hsrs, ServerResponse response) {
        try {
            String message = response.toString();
            Util.addDebugLog("Respond: " + message);
            hsrs.setContentType(UTF8);
            try (OutputStream out = hsrs.getOutputStream()) {
                out.write(message.getBytes());
                out.flush();
            }
        } catch (Exception ex) {
            Util.addErrorLog(ex);
        }
    }

    private ClientRequest initRequest(Request rqst, HttpServletRequest hsrq, HttpServletResponse hsrs) {
        ClientRequest request;
        try {

            String userAgent = rqst.getHeader(ParamKey.USER_AGENT);
            if (userAgent != null) {
                userAgent = userAgent.toLowerCase();
            }
            BufferedReader reader;
            String inputString;

            InputStreamReader isr = new InputStreamReader(rqst.getInputStream());
            reader = new BufferedReader(isr);
            inputString = reader.readLine();
            isr.close();
            reader.close();
            if (inputString == null) {
                return null;
            }
            request = ClientRequest.initRequest(inputString);
            if (request == null) {
                dataBack(hsrs, new ServerResponse(ResponseCode.WRONG_DATA_FORMAT));
                return null;
            }
            request.userAgent = userAgent;
        } catch (Exception ex) {
            Util.addErrorLog(ex);
            dataBack(hsrs, new ServerResponse(ResponseCode.WRONG_DATA_FORMAT));
            return null;
        }

        if (!request.contain(ParamKey.IP)) {
            request.put(ParamKey.IP, Util.getClientIpAddr(hsrq));
        }

        Util.addDebugLog("Client request: " + request.toString());
        return request;
    }

}
