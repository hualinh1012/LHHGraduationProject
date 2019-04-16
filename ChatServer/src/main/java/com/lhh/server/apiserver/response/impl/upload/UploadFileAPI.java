/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lhh.server.apiserver.response.impl.upload;

import com.lhh.dao.impl.file.FileDAO;
import com.lhh.server.apiserver.request.ClientRequest;
import com.lhh.server.apiserver.response.IApiAdapter;
import com.lhh.server.apiserver.response.ServerResponse;
import com.lhh.server.apiserver.response.common.EntityRespond;
import com.lhh.server.entity.impl.File;
import com.lhh.util.FileHandler;
import com.lhh.util.Util;
import com.lhh.util.constant.ResponseCode;

/**
 *
 * @author Linh Hua
 */
public class UploadFileAPI implements IApiAdapter {

    @Override
    public ServerResponse execute(ClientRequest request) {
        EntityRespond response = new EntityRespond();
        try {
            String fileName = FileHandler.getName(request.file.getSubmittedFileName());
            String fileType = FileHandler.getExtension(request.file.getSubmittedFileName());
            byte[] byteArray = FileHandler.getInputArrayByte(request.file.getInputStream());
            String fileUrl = FileHandler.generateFile(byteArray, fileName, fileType);
            File file = FileDAO.insertFile(fileUrl);
            response.data = file;
            response.code = ResponseCode.SUCCESS;
        } catch (Exception ex) {
            Util.addErrorLog(ex);
        }
        return response;
    }

}
