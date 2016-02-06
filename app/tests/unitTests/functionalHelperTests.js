///**
// * Created by reharik on 11/3/15.
// */
//
//
//var demand = require('must');
////var _ = require('ramda');
////var _fantasy = require('ramda-fantasy');
////var Maybe = _fantasy.Maybe;
////var mut = require('../../src/eventFunctions');
//
//
//var noEventTypeEvent = {};
//
//var appEvent = {
//    Event           : { EventType: 'event' },
//    OriginalPosition: 'the originalPosition',
//    OriginalEvent   : {
//        Metadata: {
//            eventName : 'someEventNotificationOn',
//            streamType: 'event'
//        },
//        Data    : {'some': 'data'}
//    }
//};
//
//var noMetadataEvent = {
//    Event: {EventType: 'event'}
//};
//
//var noDataEvent = {
//    Event: {EventType: 'event'},
//    OriginalEvent   : {
//        Metadata: {
//            eventName : 'someEventNotificationOn',
//            streamType: 'event'
//        }
//    }
//};
//
//var sysEvent = {
//    Event           : { EventType: '$event' }
//};
////var models = require('../../index')();
//var mut ;//= models.functionalHelpers;
//
//describe('FUNCTIONAL HELPERS', function() {
//    before(function() {
//    });
//
//    beforeEach(function() {
//    });
//
//    context('when calling parseBuffer on a buffer', function() {
//        it('should return a maybe of the parsed data', function() {
//            var buffer = new Buffer(JSON.stringify(noMetadataEvent), 'utf8');
//            mut.parseBuffer(buffer).must.eql(Maybe.of(noMetadataEvent));
//        })
//    });
//
//    context('when calling parseBuffer on a string', function() {
//        it('should return a maybe Nothing', function() {
//            mut.parseBuffer(noMetadataEvent).must.eql(Maybe.Nothing());
//        })
//    });
//
//});
