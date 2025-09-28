# MoodMate - Database and Application Flow Analysis

## Database and Data Storage

### Current Database Solution: **No Traditional Database**
MoodMate currently **does not use a traditional database system** like PostgreSQL, MySQL, MongoDB, or SQLite. Instead, it uses a combination of client-side storage mechanisms:

#### Data Storage Mechanisms:
1. **Browser LocalStorage** (Currently Disabled/Removed)
   - The code shows evidence of previous localStorage usage for journal entries
   - Comments indicate localStorage functionality was removed: `❌ removed localStorage`
   - Previous implementation stored journal entries locally in browser

2. **Zustand State Management**
   - Uses Zustand for global state management (see `src/store/useMoodStore.js`)
   - Currently only manages mood state in memory
   - Data is not persisted between sessions

3. **In-Memory State**
   - React component state (`useState`) for temporary data
   - Data is lost when user refreshes or closes browser

#### Key Finding: **No Data Persistence**
The application currently has **no persistent data storage**. All data is lost when the user closes the browser or refreshes the page.

## Application Architecture and Flow

### Technology Stack:
- **Frontend Framework**: React 19.1.1 with Vite
- **UI Library**: Material-UI (MUI) v7.3.1
- **Styling**: Tailwind CSS v4.1.12
- **Routing**: React Router DOM v7.8.1
- **State Management**: Zustand v5.0.7
- **AI Integration**: OpenAI SDK v5.12.2 (for mood analysis)
- **Charts**: Recharts v3.1.2

### Application Structure:

```
src/
├── components/
│   └── Layout.jsx          # Navigation drawer with crisis support
├── pages/
│   ├── Dashboard.jsx       # Main dashboard with mood tracking
│   ├── Journal.jsx         # Journal entries with AI analysis
│   ├── Profile.jsx         # User profile and settings
│   ├── Resources.jsx       # Mental health resources
│   └── Toolkit.jsx         # Wellness tools and exercises
├── store/
│   └── useMoodStore.js     # Zustand store for mood state
└── assets/
    └── theme.js            # MUI theme configuration
```

## Application Flow

### 1. Entry Point and Navigation
- **Main Entry**: `src/main.jsx` - Sets up React Router with Layout wrapper
- **Navigation**: Side drawer with 5 main sections:
  - Home (Dashboard)
  - Journal
  - Resources
  - Profile
  - Toolkit
- **Crisis Support**: Emergency hotline numbers accessible from navigation

### 2. Core User Journey

#### A. Dashboard Flow (`Dashboard.jsx`)
1. **Mood Selection Dialog**: User selects daily mood on app load
2. **Dashboard Display**:
   - Personalized greeting with mock user data
   - Mood score visualization
   - Weekly mood tracking chart
   - Mood distribution pie chart
   - Journal entry previews (mock data)
   - Daily wellness task suggestions
3. **Data Sources**: All dashboard data is currently **mock/hardcoded**

#### B. Journal Flow (`Journal.jsx`)
1. **Entry Creation**:
   - Text input for journal entries
   - Tag selection (Work, Exercise, Family, Good Meal)
   - Photo attachment capability
2. **AI Analysis**:
   - Uses OpenAI API via Hugging Face router
   - Model: `openai/gpt-oss-20b:fireworks-ai`
   - Analyzes mood, confidence, summary, and triggers
   - Requires `VITE_HF_TOKEN` environment variable
3. **Data Persistence**: **None** - entries are not saved

#### C. Profile Flow (`Profile.jsx`)
1. **User Information**: Mock user profile display
2. **Theme Selection**: Light/Dark/Colorful themes
3. **Mental Health Assessment**: Multi-step questionnaire
4. **Settings**: Personal preferences (not persisted)

#### D. Toolkit Flow (`Toolkit.jsx`)
1. **Breathing Exercises**: Guided box breathing with visual cues
2. **Mindfulness Library**: Pre-written meditation scripts
3. **Reminder Setup**: Customizable wellness reminders
4. **Interactive Features**: Step-by-step guided activities

#### E. Resources Flow (`Resources.jsx`)
Static mental health resources and educational content

### 3. State Management Flow

```
User Interaction → Component State → Zustand Store (if global) → UI Update
                                   ↓
                              No Persistence
                              (Data Lost on Refresh)
```

### 4. AI Integration Flow

```
User Journal Entry → OpenAI API Call → Hugging Face Router → 
GPT Model Analysis → JSON Response → Display Results → 
No Storage (Results Lost)
```

## Current Limitations

### Data Persistence Issues:
1. **No Database**: No backend or database system
2. **No LocalStorage**: Previous localStorage implementation was removed
3. **Session-Only Data**: All user data exists only during current session
4. **Mock Data**: Dashboard shows hardcoded sample data, not real user data

### Missing Backend Infrastructure:
1. **No API Server**: No backend to handle data persistence
2. **No User Authentication**: No user accounts or login system
3. **No Data Synchronization**: No way to sync data across devices

## Recommendations for Database Implementation

### Immediate Solutions:
1. **Re-enable localStorage** for basic client-side persistence
2. **Implement IndexedDB** for more robust client-side storage
3. **Add data export/import** functionality

### Long-term Solutions:
1. **Backend API**: Node.js/Express or similar backend
2. **Database Options**:
   - **SQLite**: For simple, file-based storage
   - **PostgreSQL**: For robust relational data
   - **MongoDB**: For flexible document storage
   - **Firebase**: For rapid prototyping with real-time features
3. **User Authentication**: Firebase Auth, Auth0, or custom solution
4. **Cloud Storage**: For cross-device synchronization

## Data Schema Recommendations

If implementing a database, suggested schema:

```sql
-- Users table
users (id, email, name, created_at, settings)

-- Journal entries
journal_entries (id, user_id, text, tags, mood_analysis, photo_url, created_at)

-- Mood tracking
mood_logs (id, user_id, mood_score, mood_type, date, notes)

-- Assessment results  
assessments (id, user_id, questions_answers, score, completed_at)
```

## Application Screenshots

The MoodMate application features a clean, modern interface with:
- **Dashboard**: Mood tracking, weekly trends, emotion distribution charts
- **Mood Selection Dialog**: Daily mood check-in with emoji-based selection
- **Crisis Support**: Accessible emergency contacts in navigation
- **Journaling Interface**: Text input with AI analysis (requires API key configuration)

![MoodMate Dashboard](https://github.com/user-attachments/assets/f93d06e2-be5e-42f2-ae01-179c83d048b5)

## Technical Issues Identified

### Missing Environment Configuration:
- **API Key Missing**: Journal page crashes without `VITE_HF_TOKEN` environment variable
- **External Image Loading**: Some images blocked by client-side security
- **Component Errors**: Journal component fails gracefully but breaks functionality

### Development Setup Required:
```bash
# Required environment variables for full functionality
VITE_HF_TOKEN=your_hugging_face_token_here
```

## Conclusion

MoodMate is currently a **frontend-only application** with no persistent data storage. While it has sophisticated UI components and AI integration, all user data is lost between sessions. The application would benefit significantly from implementing a proper database solution to create a meaningful, persistent user experience.

### Key Takeaways:
1. **No Database**: All data is temporary and session-based
2. **AI Integration**: Advanced mood analysis via OpenAI/Hugging Face
3. **Modern UI**: Clean, accessible interface with Material-UI
4. **Configuration Required**: Needs proper environment setup for full functionality
5. **Data Persistence Gap**: Critical missing feature for user retention