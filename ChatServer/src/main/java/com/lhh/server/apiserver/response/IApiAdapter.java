/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.lhh.server.apiserver.response;

import com.lhh.server.apiserver.request.ClientRequest;
import java.util.Date;

/**
 *
 * @author RuAc0n
 */
public interface IApiAdapter {
    
    public ServerResponse execute(ClientRequest request);    
}
