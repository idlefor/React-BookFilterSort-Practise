# React Practise — Search and Sort Books
> **Topic**: React: Search and Sort Books  
> **Difficulty**: Intermediate

---

<img width="953" height="481" alt="image" src="https://github.com/user-attachments/assets/149fb64e-e7ef-4da0-97de-456d473cb876" />

## 📋 Description

Complete the component shown which implements a filter that **searches and displays books** on the basis of their **genre**, and **sorts** them according to their **names**.

The list of available books and their details is imported as `booksList` in the App component. Use the list to render them as shown in the app.

---

## 🏗️ Application Structure

The application has **2 components**:

| Component | Description |
|-----------|-------------|
| `SearchSort` | Allows the user to filter/search books by genre and sort them by name |
| `Books` | Displays the details of the books based on search and sort results |

---

## ✅ Functional Requirements

### Initial View
- The initial view should render the details of **all books** in the same order as in the `booksList` variable.

### Search Input
- Search input should be of **type text**.
- Searching and filtering should occur on **unsorted data** and should:
  - Take place **after every 2 characters** of input. Books whose genre **contains** the set of typed characters should be displayed.
  - Example: a search takes place when inputs are `"lc"` and then `"lcti"`, but **NOT** when inputs are `"l"` or `"lct"`. For the latter kind of input, the component **displays the prior results**.
  - Be **case-sensitive**.
- When there is **no character** typed in the search box, it should show **all the books**.
- When **no results are found** for a search, it should display a message of **"No Results Found!"**.

### Sort Buttons
- The **Sort A to Z** button should display the books' details in **ascending** order of their names.
- The **Sort Z to A** button should display the books' details in **descending** order of their names.
- Sort buttons should work in **both cases** whether there is a string in the search box or not.

---

## 🏷️ Required `data-testid` Attributes

| Component | `data-testid` Attribute |
|-----------|------------------------|
| Input box for searching | `search` |
| Sort A to Z button | `sort-asc` |
| Sort Z to A button | `sort-desc` |
| Details of books (wrapper div) | `book-list` |

> ⚠️ **Note**: These `data-testid` attributes must not be changed — they are used by the test suite.

---

## 📁 Project File Structure

```
govtech-books-app/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Books/
│   │   │   └── index.js          ✏️  SOLUTION FILE
│   │   └── SearchSort/
│   │       └── index.js          ✏️  SOLUTION FILE (main logic)
│   ├── data/
│   │   └── booksList.js          🔒  Read-only (data source)
│   ├── App.js                    🔒  Read-only
│   ├── App.css                   🔒  Read-only
│   └── index.js                  🔒  Read-only
└── package.json
```

### 🔒 Read-Only Files (Do NOT modify)
As per the original test instructions, these files are read-only:
- `src/App.css`
- `src/App.js`
- `src/App.test.js`
- `src/data/booksList.js`
- `src/index.css`
- `src/index.js`
- `src/registerServiceWorker.js`

### ✏️ Files to Modify (Solution Files)
- `src/components/Books/index.js`
- `src/components/SearchSort/index.js`

---

## 🧠 Solution Logic Explained

### `src/components/SearchSort/index.js`

This is the **core solution file**. Key logic:

```
searchText length % 2 === 0  →  Apply filter (e.g. length 2, 4, 6...)
searchText length % 2 !== 0  →  Show results from last even-length prefix
searchText length === 0      →  Show all books (no filter)
```

**Search** is applied to **unsorted** data first, then **sort** is applied to the filtered result.

```js
// Search logic (case-sensitive, on genre field)
const lastEvenLength = searchText.length - (searchText.length % 2);
const effectiveSearch = searchText.substring(0, lastEvenLength);
filtered = booksList.filter(book => book.genre.includes(effectiveSearch));

// Sort logic (applied after filter)
if (sortOrder === 'asc') filtered.sort((a, b) => a.name.localeCompare(b.name));
if (sortOrder === 'desc') filtered.sort((a, b) => b.name.localeCompare(a.name));
```

### `src/components/Books/index.js`

- Renders the list of books passed as `books` prop.
- If `books.length === 0`, renders `"No Results Found!"` with `data-testid="no-results"`.
- Each book card shows: **Name**, **Author**, **Genre**, **Rating** (with ⭐).

---

## 🚀 Getting Started

### Prerequisites
- Node.js >= 12
- npm >= 6

### Installation & Run

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/govtech-books-app.git
cd govtech-books-app

# Install dependencies
npm install

# Start the development server
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000).

---

## 🧪 Running Tests

```bash
npm test
```

---

## 📸 Expected UI

The app renders:
1. A **search bar** to type genre keywords
2. **Sort A to Z** and **Sort Z to A** buttons
3. A grid of **book cards**, each displaying Name, Author, Genre, and Rating

---

## 💡 Key Gotchas

| Behaviour | Detail |
|-----------|--------|
| Filter triggers at every **2 chars** | At length 1, 3, 5 → show prior (last even) results |
| Filter is **case-sensitive** | `"Classics"` ≠ `"classics"` |
| Filter is on **genre**, not name | Search input matches `book.genre` |
| Sort works on **filtered** results | Sort is applied after filtering |
| Sort works **with or without** search text | Sort is always available |
| No results message | Render when filtered array is empty |

---
