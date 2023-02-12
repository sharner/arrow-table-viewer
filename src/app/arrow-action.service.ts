import { Injectable } from '@angular/core';
import { FlightServiceClient } from '../../proto/generated/proto/Flight_pb_service';
import { Result, Action } from '../../proto/generated/proto/Flight_pb';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HelloWorldService {
  private client: FlightServiceClient;
  
  constructor() {
    this.client = new FlightServiceClient(
      'http://localhost:8080');
  }
  
  doAction(): Observable<string> {
    const request = new Action();
    request.setType("health_check");
    request.setBody("");

    return new Observable((subscriber) => {
      // https://github.com/grpc/grpc-web
      let action = this.client.doAction(request);
      action.on('data', function(response: Result) {
        let res = response.getBody_asU8();
        var message = new TextDecoder().decode(res);
        console.log("doAction data " + message);
        if (res != null) {
          subscriber.next(message);
        }
      });
      action.on('end', function(end) {
        // stream end signal
        subscriber.next("done");
      });
    });
  }
}

