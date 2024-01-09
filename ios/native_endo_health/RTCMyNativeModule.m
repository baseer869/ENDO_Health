//
//  RTCMyNativeModule.m
//  native_endo_health
//
//  Created by ilhan.ryu on 1/6/24.
//

#import "RCTMyNativeModule.h"
#import <React/RCTLog.h>
@implementation RCTMyNativeModule

RCT_EXPORT_METHOD(exampleMethod:(NSString *)message resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    @try {
        NSString *result = [NSString stringWithFormat:@"%@ and hello world from iOS", message];
        resolve(result);
    }
    @catch (NSException *exception) {
        reject(@"Error", exception.reason, nil);
    }
}

RCT_EXPORT_MODULE(RCTMyNativeModule);

@end
