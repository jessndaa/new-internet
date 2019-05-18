import { Timestamp } from "@google-cloud/firestore";

export class Utility {
    /**
     * compareDate
     */
    public static compareDate(time1: Timestamp, time2: Timestamp) {
        return time1.toMillis() > time2.toMillis();
    }
}