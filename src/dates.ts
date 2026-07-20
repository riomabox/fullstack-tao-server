import dayjs from "dayjs";
import "dayjs/locale/en-gb";

dayjs.locale("en-gb");

export function getCurrentDate(): Date {
        return dayjs(new Date()).toDate();
}
