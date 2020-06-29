import { Component, OnInit, Input } from '@angular/core';
import { formatDistanceToNow } from 'date-fns';
import { utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz'
import fr from 'date-fns/locale/fr'

@Component({
  selector: 'app-notification-item',
  templateUrl: './notification-item.component.html',
  styleUrls: ['./notification-item.component.scss']
})
export class NotificationItemComponent implements OnInit {

  @Input() content: string;
  @Input() date: string | Date;

  public dateWords: string;

  constructor() { }

  ngOnInit(): void {
    const dateTz = utcToZonedTime(new Date(this.date),  Intl.DateTimeFormat().resolvedOptions().timeZone)
    this.dateWords = formatDistanceToNow(
      dateTz,
      {locale: fr}
    );
  }

}
