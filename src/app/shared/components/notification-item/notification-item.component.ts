import { Component, OnInit, Input } from '@angular/core';
import { formatDistanceToNow } from 'date-fns';
import { utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz'
import fr from 'date-fns/locale/fr'
import { Notification } from '../../models/notification/notification';

@Component({
  selector: 'app-notification-item',
  templateUrl: './notification-item.component.html',
  styleUrls: ['./notification-item.component.scss']
})
export class NotificationItemComponent implements OnInit {

  @Input() notification: Notification

  public dateWords: string;

  constructor() { }

  ngOnInit(): void {
    const dateTz = utcToZonedTime(new Date(this.notification.createdAt),  Intl.DateTimeFormat().resolvedOptions().timeZone)
    this.dateWords = formatDistanceToNow(
      dateTz,
      {locale: fr}
    );
  }

}
