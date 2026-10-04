# Admin Dashboard - Testing Guide

## Pre-Flight Checklist

Before starting to test, ensure:
- ✅ Development server is running: `npm run dev`
- ✅ No TypeScript errors in terminal
- ✅ Browser console has no errors
- ✅ `http://localhost:5173` is accessible

---

## Test Scenarios

### 🔐 Authentication Tests

**Test 1: Login Page Loads**
- Navigate to: `http://localhost:5173/admin/login`
- Expected: Login form displays with email and password fields
- Verify: Demo credentials are shown in hint box

**Test 2: Invalid Credentials**
- Enter email: `invalid@test.com`
- Enter password: `wrongpassword`
- Click Login
- Expected: Error message displays
- Verify: User stays on login page

**Test 3: Valid Credentials**
- Enter email: `admin@school.com`
- Enter password: `admin123`
- Click Login
- Expected: Redirects to dashboard
- Verify: User menu shows "Admin" in top right

**Test 4: Protected Routes**
- Open new tab: `http://localhost:5173/admin/teachers`
- Expected: Redirects to login page (not authenticated)
- Login as above
- Navigate to: `http://localhost:5173/admin/teachers`
- Expected: Teachers page loads (authenticated)

**Test 5: Logout**
- Click user avatar in top right
- Click "Logout"
- Expected: Redirects to login page
- Navigate to: `http://localhost:5173/admin`
- Expected: Redirects to login (session cleared)

---

### 📊 Dashboard Tests

**Test 1: Statistics Cards**
- Login and navigate to Dashboard
- Verify 4 statistics cards display:
  - Total Teachers: 6
  - Published News: 0-3 (depends on published count)
  - Gallery Images: 5
  - Classes: 7
- Hover over each card
- Expected: Subtle visual feedback

**Test 2: Recent News Section**
- Scroll down on Dashboard
- Verify recent news displays as cards
- Check image, title, category, date
- Click "View all" link
- Expected: Navigates to News page

**Test 3: Quick Actions**
- Verify 4 action buttons display:
  - Manage Teachers
  - Create News
  - Edit Schedule
  - Manage Gallery
- Click each button
- Expected: Navigates to respective page

---

### 👨‍🏫 Teacher Management Tests

**Test 1: View Teachers**
- Navigate to: `/admin/teachers`
- Expected: Table with 6 teachers loads
- Verify columns: Name, Subject, Position, Experience
- Verify images show next to names

**Test 2: Search Teachers**
- Type "Karimova" in search box
- Expected: Table filters to 1 result (Dilnoza Karimova)
- Type "Math" in search box
- Expected: Table filters to Math teacher
- Clear search
- Expected: All 6 teachers show again

**Test 3: Add Teacher**
- Click "Add Teacher" button
- Fill form:
  - Name: "Test Teacher"
  - Subject: "Test Subject"
  - Position: "Teacher"
  - Experience: "5 years"
  - Bio: "Test bio"
  - Photo: (any valid image URL)
- Click "Add Teacher"
- Expected: Modal closes, table updates with new teacher
- Verify new teacher appears in table

**Test 4: Edit Teacher**
- Click edit icon on any teacher row
- Modal opens with form pre-filled
- Change name to "Updated Name"
- Click "Save Changes"
- Expected: Table updates with new name

**Test 5: Delete Teacher**
- Click trash icon on any teacher row
- Confirm deletion
- Expected: Teacher removed from table
- Count should decrease

---

### 📰 News Management Tests

**Test 1: View News**
- Navigate to: `/admin/news`
- Expected: Table with articles loads
- Verify columns: Title, Category, Date, Status
- Check status badges (Published/Draft)

**Test 2: Create News**
- Click "Create News" button
- Fill form:
  - Title: "Test Article"
  - Category: "Achievements"
  - Content: "Test content..."
  - Image: (valid URL)
  - Date: Today
  - Leave unpublished (unchecked)
- Click "Create Article"
- Expected: Article appears in table as "Draft"

**Test 3: Publish News**
- Click eye icon on article (if draft)
- Expected: Status changes to "Published"
- Click eye icon again
- Expected: Status changes back to "Draft"

**Test 4: Edit News**
- Click edit icon
- Change title to "Updated Title"
- Click "Save Changes"
- Expected: Table updates

**Test 5: Search News**
- Type "Test" in search
- Expected: Only test articles show
- Type "Achievements"
- Expected: Articles in that category show

---

### 🖼️ Gallery Management Tests

**Test 1: View Gallery**
- Navigate to: `/admin/gallery`
- Expected: Grid of 5 images displays
- Verify each image shows title and order number

**Test 2: Add Image**
- Click "Add Image" button
- Fill form:
  - Title: "Test Image"
  - Image URL: (any valid image URL)
  - Order: 10
  - Leave featured unchecked
- Click "Add Image"
- Expected: New image appears in grid

**Test 3: Feature Image**
- Click star icon on image
- Expected: "Featured" badge appears
- Click star again
- Expected: Badge disappears

**Test 4: Edit Image**
- Click pencil icon
- Change order number
- Click "Save Changes"
- Expected: Order updates

**Test 5: Delete Image**
- Click trash icon
- Confirm deletion
- Expected: Image removed from grid

---

### 📅 Schedule Management Tests

**Test 1: View Schedule**
- Navigate to: `/admin/schedule`
- Expected: Class selector shows with first class selected
- Verify schedule table displays with lessons

**Test 2: Filter by Class**
- Select different class from dropdown (e.g., "10-Class")
- Expected: Table updates with that class's schedule

**Test 3: Filter by Day**
- Select a day from "Filter by Day" (e.g., "Dushanba")
- Expected: Table shows only Monday's lessons
- Select "All Days"
- Expected: Full week displays

**Test 4: Add Lesson**
- Click "Add Lesson"
- Fill form:
  - Day: "Seshanba"
  - Time: "09:00 — 09:45"
  - Subject: "Test Subject"
  - Teacher: "Test Teacher"
  - Room: "A-101"
- Click "Add Lesson"
- Expected: Lesson appears in table

**Test 5: Edit Lesson**
- Click edit icon on lesson
- Change time
- Click "Save Changes"
- Expected: Lesson updates

**Test 6: Delete Lesson**
- Click trash icon
- Confirm deletion
- Expected: Lesson removed

---

### 📋 Activity Log Tests

**Test 1: View Activities**
- Navigate to: `/admin/activity`
- Expected: List of recent activities displays
- Verify each shows: icon, description, time, user

**Test 2: Activity Updates**
- Go create/edit/delete something in another section
- Return to Activity Log
- Expected: New activity appears at top (most recent)

**Test 3: Timestamp Accuracy**
- Verify recent activities show "X minutes ago"
- Older activities show dates
- Check that times are reasonable

---

### ⚙️ Settings Tests

**Test 1: View Settings**
- Navigate to: `/admin/settings`
- Expected: Settings form displays with sections:
  - School Information
  - Contact Information
  - Social Media

**Test 2: Edit Settings**
- Change school name to "Test School"
- Change phone number
- Change a social media URL
- Click "Save Settings"
- Expected: Success message appears
- Message disappears after 3 seconds

**Test 3: Persistent Changes**
- Refresh page
- Expected: Your changes are still there (session persists)
- Reload entire page (F5)
- Expected: Changes are reset (session-only data)

---

### 📱 Responsive Design Tests

**Test 1: Desktop (1920px+)**
- Verify sidebar always visible
- Menu toggle button not visible
- All content displays properly

**Test 2: Tablet (768px - 1024px)**
- Resize browser to tablet width
- Verify sidebar visible but narrower
- Tables still readable
- All functions work

**Test 3: Mobile (< 768px)**
- Resize browser to mobile width (~375px)
- Verify sidebar hidden (drawer mode)
- Verify menu toggle button visible
- Click toggle button
- Sidebar slides in from left
- Click overlay to close
- Verify drawer closes
- Verify forms still usable
- Verify modals size appropriately

**Test 4: Touch Interactions**
- On mobile device/tablet:
  - Tap all buttons
  - Tap links
  - Tap form fields
  - All should work without double-tap zoom

---

### 🎨 UI/UX Tests

**Test 1: Visual Consistency**
- Navigate through all pages
- Verify consistent:
  - Colors
  - Typography
  - Spacing
  - Button styles

**Test 2: Hover States**
- Hover over all buttons
- Expected: Visual feedback (color change, shadow, etc.)
- Hover over table rows
- Expected: Row highlights

**Test 3: Focus States**
- Tab through form inputs
- Expected: Focus outline visible on each input
- Tab through buttons
- Expected: Buttons show focus state

**Test 4: Loading States**
- When performing actions, watch for:
  - Button text change ("Loading..." etc.)
  - Disabled state while loading
  - Success/error feedback

---

### 🔍 Edge Cases & Error Handling

**Test 1: Empty Form Submission**
- On any form, click submit without filling required fields
- Expected: Validation error or field highlight

**Test 2: Delete Confirmation**
- Try to delete any item
- Expected: Confirmation dialog appears
- Click "Cancel"
- Expected: Item not deleted
- Try again, confirm deletion
- Expected: Item deleted

**Test 3: Duplicate Data**
- Try to create item with same details
- Expected: Either allowed or error message
- (Depends on backend business logic)

**Test 4: Special Characters**
- In any text field, enter: `<script>alert('xss')</script>`
- Submit
- Expected: Text stored/displayed as-is (not executed)

**Test 5: Very Long Text**
- Enter very long text in fields
- Expected: Text wraps or truncates appropriately
- No layout breaks

**Test 6: Image Not Loading**
- Use invalid image URL
- Expected: Fallback/placeholder shows (no broken image)

---

### ⌨️ Keyboard Navigation Tests

**Test 1: Tab Navigation**
- Start on login page
- Tab through form
- Expected: Focus moves through email, password, button in order
- Shift+Tab to go backwards

**Test 2: Enter to Submit**
- In form, press Tab to reach submit button
- Press Enter
- Expected: Form submits

**Test 3: Escape to Close Modal**
- Open any modal
- Press Escape key
- Expected: Modal closes

---

## Test Results Template

```
Test Date: _______________
Tester: ____________________
Browser: ___________________
Device: ____________________

Feature          | Status | Notes
-----------------|--------|------------------
Login            | [ ]    | 
Dashboard        | [ ]    |
Teachers         | [ ]    |
News             | [ ]    |
Gallery          | [ ]    |
Schedule         | [ ]    |
Activity Log     | [ ]    |
Settings         | [ ]    |
Responsive       | [ ]    |
Accessibility    | [ ]    |

Issues Found:
1. ___________________________
2. ___________________________
3. ___________________________

Approved for Production: [ ] Yes [ ] No
```

---

## Performance Testing

### Bundle Size
- Current: 335.59 kB (97.84 kB gzipped)
- Expected: < 400 kB
- ✅ Within acceptable range

### Load Time
- Expected: < 3 seconds (at 4G)
- Measure with DevTools > Network

### First Contentful Paint (FCP)
- Target: < 1.5s
- Check with DevTools > Lighthouse

### Time to Interactive (TTI)
- Target: < 2.5s
- Check with DevTools > Lighthouse

---

## Browser Compatibility

- [x] Chrome 90+
- [x] Edge 90+
- [x] Firefox 88+
- [x] Safari 14+
- [x] Mobile Chrome
- [x] Mobile Safari

---

## Accessibility Checklist

- [x] Can tab through all controls
- [x] Focus visible on interactive elements
- [x] Color contrast sufficient
- [x] Form labels associated with inputs
- [x] Error messages clear
- [x] Alt text on images
- [x] Semantic HTML
- [x] No content hidden from keyboard users

---

## Sign-Off

Once all tests pass, you're ready for production deployment.

**Tested by:** ___________________
**Date:** ___________________
**Approved:** ✅ / ❌

