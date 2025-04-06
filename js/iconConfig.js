const ICON_CONFIG = {
    search: {
        selector: 'button[aria-label="Search"]',
        materialIconName: 'search'
    },
    mic: {
        selector: 'button[aria-label="Search with your voice"]',
        materialIconName: 'mic'
    },
    home: {
        selector: 'a[title="Home"]',
        materialIconName: 'home'
    },
    explore: {
        selector: 'a[title="Explore"]',
        materialIconName: 'explore'
    },
    subscriptions: {
        selector: 'a[title="Subscriptions"]',
        materialIconName: 'subscriptions'
    },
    shorts: {
        selector: 'a[title="Shorts"]',
        materialIconName: 'play_circle'
    },
    library: {
        selector: 'a[title="Library"]',
        materialIconName: 'video_library'
    },
    history: {
        selector: 'a[title="History"]',
        materialIconName: 'history'
    },
    yourVideos: {
        selector: 'a[title="Your videos"]',
        materialIconName: 'slideshow'
    },
    watchLater: {
        selector: 'a[title="Watch later"]',
        materialIconName: 'schedule'
    },
    likedVideos: {
        selector: 'a[title="Liked videos"]',
        materialIconName: 'thumb_up'
    },
    notifications: {
        selector: 'button[aria-label="Notifications"]',
        materialIconName: 'notifications'
    },
    create: {
        selector: 'button[aria-label="Create"]',
        materialIconName: 'add_circle'
    },
    yourClips: {
        selector: 'a[title="Your clips"]',
        materialIconName: 'content_cut'
    },
    playlists: {
        selector: 'a[title="Playlists"]',
        materialIconName: 'playlist_play'
    },

    // video player icons, not implemented yet
    /*
    settings: {
        selector: 'button[aria-label="Settings"]',
        materialIconName: 'settings'
    },
    */
};

window.ICON_CONFIG = ICON_CONFIG;