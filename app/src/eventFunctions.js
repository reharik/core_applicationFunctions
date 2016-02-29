
module.exports = function(R, uuid, functionalHelpers){
    var fh = functionalHelpers;
    var parseMetadata = R.compose(R.chain(fh.safeParseBuffer), R.chain(fh.safeProp('Metadata')), fh.safeProp('Event'));
    var parseData = R.compose(R.chain(fh.safeParseBuffer), R.chain(fh.safeProp('Data')), fh.safeProp('Event'));
    var outGoingEvent = event => {
        var data = fh.safeProp('data',event);
        var _metadata = (e,d) =>  _fantasy.Maybe(R.merge(fh.safeProp('metadata',e), fh.safeProp('continuationId',d)));
        var metadata = _metadata(data,event);
        return {
            EventId : uuid.v4(),
            Type : fh.safeProp('eventName',event).getOrElse(''),
            IsJson : true,
            Data    : fh.safeCreateBuffer(data).getOrElse(),
            Metadata:  fh.safeCreateBuffer(metadata).getOrElse()
        }
    };

    var incomingEvent = event => {
        return {
            eventName : fh.safeProp('eventType',event).getOrElse(''),
            metadata: parseMetadata(event).getOrElse({}),
            data: parseData(event).getOrElse({}),
            originalPosition: fh.safeProp('OriginalPosition', event).getOrElse({})
        };
    };

    return {
        parseMetadata,
        parseData,
        outGoingEvent,
        incomingEvent
    }
};