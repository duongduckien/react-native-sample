#import "DemoModule.h"

@implementation DemoModule
{
    CLLocationManager *locationManager;
    CLLocation *currentLocation;
}

RCT_EXPORT_MODULE()

RCT_REMAP_METHOD(getCurrentLocation, resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    @try {
        CLLocationManager *locationManager = [[CLLocationManager alloc] init];
        locationManager.delegate = self;
        locationManager.distanceFilter = kCLDistanceFilterNone;
        locationManager.desiredAccuracy = kCLLocationAccuracyBest;
        [locationManager requestWhenInUseAuthorization];
        [locationManager startUpdatingLocation];
        
        // Get coordinate data
        CLLocation *location = [locationManager location];
        CLLocationCoordinate2D coordinate = [location coordinate];
        
        // Get latitude, longitude by string
        NSString *latitude = [NSString stringWithFormat:@"%f", coordinate.latitude];
        NSString *longitude = [NSString stringWithFormat:@"%f", coordinate.longitude];
        
        // Return an array value of latitude, longitude to JS code
        NSArray *result = @[latitude, longitude];
        resolve(result);
    } @catch (NSException *exception) {
        NSString *error = @"Can not get the current location";
        reject(@"Error", @"Error description", error);
    }
}

- (void)locationManager:(CLLocationManager *)manager didUpdateLocations:(NSArray *)locations
{
    currentLocation = [locations lastObject];
    [locationManager stopUpdatingLocation];
}

@end

