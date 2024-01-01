import { formatISO, format, isAfter, isBefore } from "date-fns";

export class DateUtils {
  public static isActive(
    dateReference: Date,
    date_debut?: string,
    date_fin?: string
  ) {
    const dateDebut = DateParser.toDate(date_debut);
    if (!dateDebut) {
      return false;
    }
    const dateFin = DateParser.toDate(date_fin);
    return (
      isAfter(dateReference, dateDebut) &&
      (dateFin ? isBefore(dateReference, dateFin) : true)
    );
  }
}

export class DateParser {
  public static toDate(date?: string) {
    try {
      return date ? new Date(date) : undefined;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }
}

export class DateFormater {
  private static DATE = "dd/MM/yyyy";
  private static DATE_TIME = "dd/MM/yyyy HH:mm";
  private static EMPTY = "";

  public static toISO(date?: Date): string | undefined {
    try {
      return date ? formatISO(date, { format: "extended" }) : undefined;
    } catch (error) {
      return undefined;
    }
  }

  private static format(date?: string, pattern = DateFormater.DATE) {
    try {
      return date ? format(new Date(date), pattern) : DateFormater.EMPTY;
    } catch (error) {
      return DateFormater.EMPTY;
    }
  }

  public static toDate(date?: string, pattern = DateFormater.DATE) {
    return DateFormater.format(date, pattern);
  }

  public static toDateTime(date?: string, pattern = DateFormater.DATE_TIME) {
    return DateFormater.format(date, pattern);
  }
}
