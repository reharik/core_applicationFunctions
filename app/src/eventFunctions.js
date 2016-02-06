
module.exports = function(R, functionalHelpers){
    var fh = functionalHelpers;
    var parseMetadata = R.compose(R.chain(fh.parseBuffer), R.chain(fh.safeProp('Metadata')), fh.safeProp('OriginalEvent'));
    var parseData = R.compose(R.chain(fh.parseBuffer), R.chain(fh.safeProp('Data')), fh.safeProp('OriginalEvent'));
    var outGoingEvent = R.curry((event, metadata) => {
        return {
            EventId : uuid.v4(),
            Type : fh.safeProp('eventName',event).getOrElse(''),
            IsJson : true,
            Data    : new buffer.Buffer(JSON.stringify(fh.safeProp('data',event).getOrElse(''))),
            Metadata:  new buffer.Buffer(JSON.stringify(metadata))
        };
    });
    var incomingEvent = event=> {
        return {
            eventName : (R.compose(R.chain(fh.safeProp('eventName')),parseMetadata)(event)).getOrElse(''),
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