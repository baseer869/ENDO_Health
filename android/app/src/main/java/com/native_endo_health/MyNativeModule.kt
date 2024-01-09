package com.native_endo_health

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class MyNativeModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "MyNativeModule"
    }

    @ReactMethod
    fun exampleMethod(message: String, promise: Promise) {
        // 네이티브 로직
        try {
            val result = "$message and hello world from AOS"
            promise.resolve(result)
        } catch (e: Exception) {
            promise.reject("Error", e.localizedMessage)
        }
    }
}