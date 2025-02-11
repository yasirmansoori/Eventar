# 🗓️ **Eventar: The Modern React Calendar Library**  

**A powerful, customizable, and lightweight React calendar component with seamless event management.**  

```jsx
// Your calendar, simplified!
<Eventar events={events} views={["day", "week", "month", "year"]} theme="light" />
```

---

## ✨ **Why Eventar?**  

- 🗓️ **Multiple Calendar Views** – Switch between Day, Week, Month, and Year effortlessly.  
- 🌈 **Light & Dark Mode** – Seamlessly adapt to user preferences.  
- ⚡ **Blazing Fast Performance** – Optimized rendering for smooth navigation.  
- 🎠 **Framer Motion Animations** – Modern and sleek transitions.  
- 📱 **Fully Responsive** – Works flawlessly on all screen sizes.  
- 🌟 **Event Filtering & Color Coding** – Categorize and highlight events.  
- 🔒 **Type-Safe with TypeScript** – Reliable and developer-friendly.  
- 🎉 **Customizable Event Display** – Use your own modals or components.  

---

## 🚀 **Installation**  

```bash
npm install eventar
# or
yarn add eventar
# or
pnpm add eventar
```

---

## 📚 **Usage Guide**  

```jsx
import { Eventar } from "eventar";
import "eventar/dist/eventar.css"; // Import the default styles

function App() {
  const events = [
    {
      id: "1",
      title: "Team Meeting",
      start: new Date("2024-03-15T10:00:00"),
      end: new Date("2024-03-15T11:00:00"),
      color: "blue",
    },
  ];

  return <Eventar events={events} views={["month", "week"]} theme="light" />;
}
```

---

## 🎨 **CSS Styling**  

Eventar comes with built-in styles, but you can fully customize the appearance using CSS. **Make sure to import the default styles** from the `dist` folder:

```js
import "eventar/dist/style.css";
```

### **Theming**  
You can switch between **light** and **dark** themes by passing the `theme` prop:

```jsx
<Eventar events={events} theme="dark" />
```

---

## 🎓 **API Reference**  

### **`<Eventar>` Props**  

| Prop                 | Required | Type                            | Default                 | Description                                                                 |
| -------------------- | -------- | ------------------------------- | ----------------------- | --------------------------------------------------------------------------- |
| `events`             | ✅        | `Array`                         | `[]`                    | Array of events to display                                                  |
| `views`              | ✅        | `Array`                         | `["day","month"]`       | Available views for the calendar                                            |
| `isLoading`          | ✅        | `boolean`                       | `false`                 | Show loading spinner while fetching events                                  |
| `error`              | ✅        | `string`                        | `null`                  | Error message to display in case of fetch error                             |
| `defaultView`        | ❌        | `string`                        | `"month"`               | Default visible view on calendar render                                     |
| `theme`              | ❌        | `string`                        | `"light"`               | Theme of the calendar, can be "light" or "dark"                             |
| `navigation`         | ❌        | `boolean`                       | `true`                  | Enable/disable navigation buttons                                           |
| `showPastDates`      | ❌        | `boolean`                       | `true`                  | Show/hide past dates in the calendar                                        |
| `yearRange`          | ❌        | `Array`                         | `[2024]`                | Range of years to display in the Year view                                  |
| `spinnerComponent`   | ❌        | `SpinnerVariant`                | `SpinnerVariant.SQUARE` | Custom spinner component to display while loading                           |
| `customViewerModal`  | ❌        | `(event: Event) => JSX.Element` | `null`                  | Custom modal component to display event details                             |
| `defaultModalConfig` | ❌        | `DefaultModalConfig`            | `{}`                    | Default configuration for event modal, if customViewerModal is not provided |
---

## 🎨 **Customization**
### **`<CustomViewerModal>` Component**

```jsx
<Eventar
  events={events}
  customEventViewer={(event) => (
    <div className="custom-event">
      <h3>{event.title}</h3>
      <p>{event.description}</p>
    </div>
  )}
/>
```

## 📈 **Data Fetching**  

```jsx
import { useEvents } from "Eventar";

function Calendar() {
  const { events, isLoading, error } = useEvents({
    endpoint: "your-api-endpoint",
    refactorData: (data) =>
     // Transform your API data to CalendarEvent[]
      data.map((item) => ({
        id: item.id,
        title: item.title,
        start: new Date(item.startTime),
        end: new Date(item.endTime),
      })),
  });

  return <Eventar events={events} isLoading={isLoading} error={error} />;
}
```

---

## 🧩 Examples

**`Full Featured Calendar With Default Modal Config`**

```jsx
<Eventar
  events={events}
  navigation={true}
  views={["day", "week", "month", "year"]}
  defaultView="month"
  yearRange={["2024", "2025"]}
  showPastDates={false}
  theme="light"
  spinnerComponent={SpinnerVariant.BARS}
  defaultModalConfig={{
    showModalHeaderStrip: true,
    disableActionButton: false,
  }}
/>
```

**`Full Featured Calendar With Custom Modal Component`**

```jsx
<Eventar
  events={events}
  navigation={true}
  views={["day", "week", "month", "year"]}
  defaultView="month"
  yearRange={["2024", "2025"]}
  showPastDates={false}
  theme="light"
  spinnerComponent={SpinnerVariant.BARS}
  customViewerModal={(event) => (
    <div className="custom-event">
      <h3>{event.title}</h3>
      <p>{event.description}</p>
    </div>
  )}
/>
```

---


## 📝 **License**  

Licensed under MIT

---

## 🤝 **Contributing**  

Got ideas for new features? Found a bug? PRs and issues are welcome! Check the [issues page](https://github.com/yasirmansoori/Eventar/issues).

---