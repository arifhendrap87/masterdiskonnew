import { Images } from "@config";

const DataMenu = [
    {
        id: 1,
        icon: "plane",
        name: "F&B Dine In",
        route: "FlightSearch",
        iconAnimation: "flight.json",
        type: 'flight',
        // image: Images.flight,
        checked: true
    },


    {
        id: 2,
        icon: "handshake",
        name: "Takeaway",
        route: "Deal",
        iconAnimation: "hotel.json",
        type: 'deal',
        // image: Images.hotel
    },

    {
        id: 3,
        icon: "map-signs",
        name: "Beauty",
        route: "Activities",
        iconAnimation: "tour.json",
        type: 'activities',
        // image: Images.trip
    },


    {
        id: 4,
        icon: "ellipsis-v",
        name: "Health",
        route: "Other",
        iconAnimation: "tour.json",
        type: 'other',
        // image: Images.trip
    },
    {
        id: 5,
        icon: "plane",
        name: "Ecards",
        route: "FlightSearch",
        iconAnimation: "flight.json",
        type: 'flight',
        // image: Images.flight,
        checked: true
    },


    {
        id: 6,
        icon: "handshake",
        name: "Staycation",
        route: "Deal",
        iconAnimation: "hotel.json",
        type: 'deal',
        // image: Images.hotel
    },

    {
        id: 7,
        icon: "map-signs",
        name: "Buy 1 Get 1",
        route: "Activities",
        iconAnimation: "tour.json",
        type: 'activities',
        // image: Images.trip
    },
    {
        id: 8,
        icon: "map-marker-alt",
        name: "New Deals",
        route: "Tour",
        iconAnimation: "tour.json",
        type: 'trip',
        // image: Images.trip
    },


];

export { DataMenu };
