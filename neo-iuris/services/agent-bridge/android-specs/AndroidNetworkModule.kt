package com.google.antigravity.bridge

import okhttp3.*
import org.json.JSONObject
import java.util.concurrent.TimeUnit

object AndroidNetworkModule {
    private val client = OkHttpClient.Builder()
        .readTimeout(0, TimeUnit.MILLISECONDS)
        .build()

    private var webSocket: WebSocket? = null

    fun connect(ip: String, port: String = "8080", token: String, listener: WebSocketListener) {
        val request = Request.Builder()
            .url("ws://$ip:$port")
            .build()
        
        webSocket = client.newWebSocket(request, object : WebSocketListener() {
            override fun onOpen(webSocket: WebSocket, response: Response) {
                // Send Auth Token immediately
                val authJson = JSONObject().apply {
                    put("type", "AUTH")
                    put("token", token)
                }
                webSocket.send(authJson.toString())
                listener.onOpen(webSocket, response)
            }

            override fun onMessage(webSocket: WebSocket, text: String) {
                listener.onMessage(webSocket, text)
            }

            override fun onFailure(webSocket: WebSocket, t: Throwable, response: Response?) {
                listener.onFailure(webSocket, t, response)
            }
        })
    }

    fun sendCommand(command: String) {
        val json = JSONObject().apply {
            put("type", "COMMAND")
            put("command", command)
        }
        webSocket?.send(json.toString())
    }
}
