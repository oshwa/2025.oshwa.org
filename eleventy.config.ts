import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import advancedFormat from "dayjs/plugin/advancedFormat";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);

// Note: Eleventy type definitions are not yet available, hence the use of `any` in this file.

export default function (eleventyConfig: any) {
    eleventyConfig.addPassthroughCopy("src/static");

    eleventyConfig.setTemplateFormats([
        // Templates:
        "html",
        "md",
    ]);

    const eventDateFormat = "YYYY-M-D h:mm A";

    eleventyConfig.addCollection("events", (collectionApi: any) => {
        return collectionApi
            .getFilteredByTag("events")
            .sort((a: any, b: any) => {
                const aDate = dayjs(a.start, eventDateFormat);
                const bDate = dayjs(b.start, eventDateFormat);
                return bDate.unix() - aDate.unix();
            })
            .reverse();
    });

    eleventyConfig.addFilter("formatDate", (date: Date, template: string, timezone: string = "America/New_York") => {
        // Reference: https://day.js.org/docs/en/display/format
        const d = dayjs.tz(date, timezone);
        return d.format(template);
    });

    eleventyConfig.addShortcode("formatEventDates", (start: string, end: string, timezone: string) => {
        const startDate = dayjs.tz(start, eventDateFormat, timezone);
        const endDate = dayjs.tz(end, eventDateFormat, timezone);

        return `${startDate.format("MMMM D, YYYY")} @ ${startDate.format("h:mm A")} - ${endDate.format("h:mm A z")}`;
    });

    eleventyConfig.addShortcode(
        "eventGoogleCalendarLink",
        (title: string, details: string, location: string, start: string, end: string, timezone: string) => {
            // Reference: https://github.com/InteractionDesignFoundation/add-event-to-calendar-docs/blob/main/services/google.md
            const startDate = dayjs.tz(start, eventDateFormat, timezone).utc();
            const endDate = dayjs.tz(end, eventDateFormat, timezone).utc();
            const datesFormat = "YYYYMMDD[T]HHmm00[Z]";
            const dates = `${startDate.format(datesFormat)}/${endDate.format(datesFormat)}`;

            const dst = new URL("https://calendar.google.com/calendar/r/eventedit");
            dst.searchParams.set("text", title);
            dst.searchParams.set("dates", dates);
            dst.searchParams.set("ctz", timezone);
            dst.searchParams.set("location", location);
            dst.searchParams.set("details", details);
            return dst.toString();
        },
    );

    return {
        dir: {
            input: "src",
            includes: "_includes",
            output: "build",
        },
    };
}
