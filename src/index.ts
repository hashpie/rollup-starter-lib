import {getNextLunchtime} from "./lunchtime.js";
import {millisecondsUntil} from "./millisecondsUntil.js";

export default function howLongTillLunch(hours, minutes) {
    // lunch is at 12.30
    if (hours === undefined) hours = 12;
    if (minutes === undefined) minutes = 30;

    return millisecondsUntil(getNextLunchtime(hours, minutes));
}
