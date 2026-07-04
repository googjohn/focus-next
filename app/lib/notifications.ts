import { SelectedMode } from "./definitions";

export function useNotifications() {

    const requestNotif = async () => {
        try {
            if (typeof window !== undefined) {
                if (!("Notification" in window)) {
                    console.log("Notification not supported.")
                    return;
                }

                const permission = Notification.permission
                if (permission === 'denied') {
                    console.log("User has to manually enable notification permission")
                    return;
                } else if (permission === 'granted') {
                    console.log("Permission already granted.")
                    return;
                }

                const request = await Notification.requestPermission()
                if (request === 'denied') {
                    console.log("Permission request denied.")
                    return;
                }

                console.log("Permission to send notification granted.")
                return;
            }
            console.log('window undefined')
        } catch (err) {
            console.error(err)
            return;
        }
    }

    const showNotif = (
        mode: SelectedMode,
        sessions: number,
        interval: number
    ) => {
        try {
            if (typeof window !== undefined) {
                if (Notification.permission === 'granted') {
                    let notifTitle = "";
                    let notifBody = "";

                    if (mode === 'focus') {
                        notifTitle = "Time to take a break."
                        notifBody = (sessions + 1) % interval === 0 ?
                            "It's time to take a long break." :
                            "Take a short break."
                    } else {
                        notifTitle = "It's time to focus!"
                        notifBody = "Break is over. It's time to get back to work."
                    }

                    const notifOptions = {
                        body: notifBody,
                        tag: 'keep-focus-time-end',
                        icon: 'https://fav.farm/clock',
                        badge: 'https://fav.farm/clock',
                        renotify: true,
                    };

                    const newNotif = new Notification(notifTitle, notifOptions)

                    newNotif.onclick = function () {
                        window.focus();
                        this.close();
                    }

                    newNotif.onerror = function (error) {
                        console.error("Notification error. ", error)
                    }
                }
            } else {
                console.log("Permission not granted.")
            }

        } catch (error) {
            console.error(error)
            return;
        }
    }

    return {
        requestNotif,
        showNotif
    }
}