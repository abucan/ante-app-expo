import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import utc from 'dayjs/plugin/utc';
import weekday from 'dayjs/plugin/weekday';

dayjs.extend(utc);
dayjs.extend(weekday);
dayjs.extend(isoWeek);

export default dayjs;
