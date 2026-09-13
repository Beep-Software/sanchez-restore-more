import { useEffect, useState } from 'react'
import { notificationService } from '../services/notifications'

export default function NotificationManager() {
  const [notifications, setNotifications] = useState([])

  useEffect(() => notificationService.subscribe((notification) => {
    setNotifications((current) => [...current, notification])
    window.setTimeout(() => {
      setNotifications((current) => current.filter((item) => item.id !== notification.id))
    }, notification.duration)
  }), [])

  return (
    <div className="notification-stack" aria-live="polite" aria-atomic="true">
      {notifications.map((notification) => (
        <div key={notification.id} className={`notification notification-${notification.tone}`} role={notification.tone === 'error' ? 'alert' : 'status'}>
          <span>{notification.message}</span>
          <button type="button" onClick={() => setNotifications((current) => current.filter((item) => item.id !== notification.id))} aria-label="Dismiss notification">
            ×
          </button>
        </div>
      ))}
    </div>
  )
}