// package: arrow.flight.protocol
// file: proto/Flight.proto

import * as proto_Flight_pb from "../proto/Flight_pb";
import {grpc} from "@improbable-eng/grpc-web";

type FlightServiceHandshake = {
  readonly methodName: string;
  readonly service: typeof FlightService;
  readonly requestStream: true;
  readonly responseStream: true;
  readonly requestType: typeof proto_Flight_pb.HandshakeRequest;
  readonly responseType: typeof proto_Flight_pb.HandshakeResponse;
};

type FlightServiceListFlights = {
  readonly methodName: string;
  readonly service: typeof FlightService;
  readonly requestStream: false;
  readonly responseStream: true;
  readonly requestType: typeof proto_Flight_pb.Criteria;
  readonly responseType: typeof proto_Flight_pb.FlightInfo;
};

type FlightServiceGetFlightInfo = {
  readonly methodName: string;
  readonly service: typeof FlightService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof proto_Flight_pb.FlightDescriptor;
  readonly responseType: typeof proto_Flight_pb.FlightInfo;
};

type FlightServiceGetSchema = {
  readonly methodName: string;
  readonly service: typeof FlightService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof proto_Flight_pb.FlightDescriptor;
  readonly responseType: typeof proto_Flight_pb.SchemaResult;
};

type FlightServiceDoGet = {
  readonly methodName: string;
  readonly service: typeof FlightService;
  readonly requestStream: false;
  readonly responseStream: true;
  readonly requestType: typeof proto_Flight_pb.Ticket;
  readonly responseType: typeof proto_Flight_pb.FlightData;
};

type FlightServiceDoPut = {
  readonly methodName: string;
  readonly service: typeof FlightService;
  readonly requestStream: true;
  readonly responseStream: true;
  readonly requestType: typeof proto_Flight_pb.FlightData;
  readonly responseType: typeof proto_Flight_pb.PutResult;
};

type FlightServiceDoExchange = {
  readonly methodName: string;
  readonly service: typeof FlightService;
  readonly requestStream: true;
  readonly responseStream: true;
  readonly requestType: typeof proto_Flight_pb.FlightData;
  readonly responseType: typeof proto_Flight_pb.FlightData;
};

type FlightServiceDoAction = {
  readonly methodName: string;
  readonly service: typeof FlightService;
  readonly requestStream: false;
  readonly responseStream: true;
  readonly requestType: typeof proto_Flight_pb.Action;
  readonly responseType: typeof proto_Flight_pb.Result;
};

type FlightServiceListActions = {
  readonly methodName: string;
  readonly service: typeof FlightService;
  readonly requestStream: false;
  readonly responseStream: true;
  readonly requestType: typeof proto_Flight_pb.Empty;
  readonly responseType: typeof proto_Flight_pb.ActionType;
};

export class FlightService {
  static readonly serviceName: string;
  static readonly Handshake: FlightServiceHandshake;
  static readonly ListFlights: FlightServiceListFlights;
  static readonly GetFlightInfo: FlightServiceGetFlightInfo;
  static readonly GetSchema: FlightServiceGetSchema;
  static readonly DoGet: FlightServiceDoGet;
  static readonly DoPut: FlightServiceDoPut;
  static readonly DoExchange: FlightServiceDoExchange;
  static readonly DoAction: FlightServiceDoAction;
  static readonly ListActions: FlightServiceListActions;
}

export type ServiceError = { message: string, code: number; metadata: grpc.Metadata }
export type Status = { details: string, code: number; metadata: grpc.Metadata }

interface UnaryResponse {
  cancel(): void;
}
interface ResponseStream<T> {
  cancel(): void;
  on(type: 'data', handler: (message: T) => void): ResponseStream<T>;
  on(type: 'end', handler: (status?: Status) => void): ResponseStream<T>;
  on(type: 'status', handler: (status: Status) => void): ResponseStream<T>;
}
interface RequestStream<T> {
  write(message: T): RequestStream<T>;
  end(): void;
  cancel(): void;
  on(type: 'end', handler: (status?: Status) => void): RequestStream<T>;
  on(type: 'status', handler: (status: Status) => void): RequestStream<T>;
}
interface BidirectionalStream<ReqT, ResT> {
  write(message: ReqT): BidirectionalStream<ReqT, ResT>;
  end(): void;
  cancel(): void;
  on(type: 'data', handler: (message: ResT) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'end', handler: (status?: Status) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'status', handler: (status: Status) => void): BidirectionalStream<ReqT, ResT>;
}

export class FlightServiceClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  handshake(metadata?: grpc.Metadata): BidirectionalStream<proto_Flight_pb.HandshakeRequest, proto_Flight_pb.HandshakeResponse>;
  listFlights(requestMessage: proto_Flight_pb.Criteria, metadata?: grpc.Metadata): ResponseStream<proto_Flight_pb.FlightInfo>;
  getFlightInfo(
    requestMessage: proto_Flight_pb.FlightDescriptor,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: proto_Flight_pb.FlightInfo|null) => void
  ): UnaryResponse;
  getFlightInfo(
    requestMessage: proto_Flight_pb.FlightDescriptor,
    callback: (error: ServiceError|null, responseMessage: proto_Flight_pb.FlightInfo|null) => void
  ): UnaryResponse;
  getSchema(
    requestMessage: proto_Flight_pb.FlightDescriptor,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: proto_Flight_pb.SchemaResult|null) => void
  ): UnaryResponse;
  getSchema(
    requestMessage: proto_Flight_pb.FlightDescriptor,
    callback: (error: ServiceError|null, responseMessage: proto_Flight_pb.SchemaResult|null) => void
  ): UnaryResponse;
  doGet(requestMessage: proto_Flight_pb.Ticket, metadata?: grpc.Metadata): ResponseStream<proto_Flight_pb.FlightData>;
  doPut(metadata?: grpc.Metadata): BidirectionalStream<proto_Flight_pb.FlightData, proto_Flight_pb.PutResult>;
  doExchange(metadata?: grpc.Metadata): BidirectionalStream<proto_Flight_pb.FlightData, proto_Flight_pb.FlightData>;
  doAction(requestMessage: proto_Flight_pb.Action, metadata?: grpc.Metadata): ResponseStream<proto_Flight_pb.Result>;
  listActions(requestMessage: proto_Flight_pb.Empty, metadata?: grpc.Metadata): ResponseStream<proto_Flight_pb.ActionType>;
}

