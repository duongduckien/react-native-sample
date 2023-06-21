package com.reactnativedemomodule;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.PromiseImpl;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.module.annotations.ReactModule;
import com.facebook.react.modules.permissions.PermissionsModule;

import android.content.Context;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.location.Criteria;
import android.widget.Toast;
import android.Manifest;
import java.util.ArrayList;
import android.os.Bundle;

@ReactModule(name = DemoModuleModule.NAME)
public class DemoModuleModule extends ReactContextBaseJavaModule {
    public static final String NAME = "DemoModule";

    private static final long MIN_TIME_UPDATE = 1000 * 60 * 1;
    private static final float MIN_DISTANCE_UPDATE = 1;

    private final LocationListener locationListener = new LocationListener() {
        @Override
        public void onLocationChanged(Location location) { }

        @Override
        public void onStatusChanged(String provider, int status, Bundle extras) { }

        @Override
        public void onProviderEnabled(String provider) { }

        @Override
        public void onProviderDisabled(String provider) { }
    };


    public DemoModuleModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    @NonNull
    public String getName() {
        return NAME;
    }

    @ReactMethod
    public void getCurrentLocation(Promise promise) {
        Callback onSuccess = new Callback() {
            @Override
            public void invoke(Object... args) {
                LocationManager locationManager = (LocationManager) getReactApplicationContext().getSystemService(Context.LOCATION_SERVICE);

                Criteria criteria = new Criteria();
                criteria.setAccuracy(Criteria.ACCURACY_FINE);
                String provider = locationManager.getBestProvider(criteria, false);

                boolean isGPSEnabled = locationManager.isProviderEnabled(LocationManager.GPS_PROVIDER);
                boolean isNetworkEnabled = locationManager.isProviderEnabled(LocationManager.NETWORK_PROVIDER);

                if (!isGPSEnabled && !isNetworkEnabled) {
                    showToast("No network provider is enabled");
                } else {
                    locationManager.requestLocationUpdates(LocationManager.GPS_PROVIDER, MIN_TIME_UPDATE, MIN_DISTANCE_UPDATE, locationListener);

                    if (locationManager != null) {
                        Location location = locationManager.getLastKnownLocation(LocationManager.GPS_PROVIDER);
                        
                        if (location != null) {
                            String latitude = String.format("%.4f", location.getLatitude());
                            String longitude = String.format("%.4f", location.getLongitude());

                            WritableNativeArray result = new WritableNativeArray();
                            result.pushString(latitude);
                            result.pushString(longitude);
                            promise.resolve(result);
                        }
                    }                 
                }
            }
        };

        Callback onError = new Callback() {
            @Override
            public void invoke(Object... args) {
                showToast("Permissions are denied");
            }
        };

        PermissionsModule permission = getReactApplicationContext().getNativeModule(PermissionsModule.class);
        permission.requestPermission(Manifest.permission.ACCESS_FINE_LOCATION, new PromiseImpl(onSuccess, onError));
    }

    public void showToast(String message) {
        Toast.makeText(
            getReactApplicationContext(),
            message,
            Toast.LENGTH_LONG
        ).show();
    }
}
