import { UserDroit } from "utils/droits";
import { AbstractProtection } from "./AbstractProtection";

type MailAction = "envoyer";

const MAIL_ACTIONS: MailAction[] = ["envoyer"];

export class MailProtection extends AbstractProtection {
  private static MAILS = "mails";

  private _mails: Record<string, boolean>;

  constructor(userDroit: UserDroit) {
    super(userDroit);
    this._mails = this.buildActions(MAIL_ACTIONS, MailProtection.MAILS);
  }

  get mails(): Record<MailAction, boolean> {
    return this._mails;
  }
}
