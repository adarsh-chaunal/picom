// Pub / sub for component communication

const EventBus = $({});

function publish(event, data) {
    EventBus.trigger(event, data);
}

function subscribe(event, handler) {
    EventBus.on(event, handler);
}
