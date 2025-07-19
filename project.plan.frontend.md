# School Time Scheduler - Frontend Implementation Plan

## Project Overview

Frontend implementation of a school time scheduling system using React Router 7, TypeScript, and Jotai for state management. This plan focuses on building a complete frontend with mock data before backend integration.

## Technology Stack

### Core Technologies
- **Framework**: React 19 with TypeScript
- **Router**: React Router 7 (Data Router)
- **State Management**: Jotai
- **Styling**: Styled Components + Radix UI
- **Forms**: React Hook Form + Zod validation
- **HTTP Client**: TanStack Query (for future API integration)
- **Testing**: Vitest + React Testing Library

### Styling Options Considered

#### 1. **Styled Components + Radix UI** ✅ (Selected)
- **Styled Components**: CSS-in-JS with dynamic styling, theme support, and component-based approach
- **Radix UI**: Unstyled, accessible components that work perfectly with styled-components
- **Benefits**: 
  - Full CSS-in-JS control with dynamic theming
  - Excellent accessibility out of the box
  - TypeScript support
  - Component composition and reusability
  - No external CSS dependencies

#### 2. **Tailwind CSS + Headless UI**
- **Tailwind**: Utility-first CSS framework
- **Headless UI**: Unstyled, accessible components
- **Benefits**: Rapid development, consistent design system
- **Drawbacks**: Larger bundle size, less dynamic styling control

#### 3. **Emotion + Radix UI**
- **Emotion**: CSS-in-JS library similar to styled-components
- **Benefits**: Smaller bundle size, good performance
- **Drawbacks**: Less mature ecosystem than styled-components

#### 4. **CSS Modules + Radix UI**
- **CSS Modules**: Scoped CSS with local class names
- **Benefits**: No runtime overhead, familiar CSS syntax
- **Drawbacks**: Less dynamic styling capabilities

#### 5. **Mantine**
- **Full-featured UI library** with built-in components
- **Benefits**: Complete solution, great documentation
- **Drawbacks**: Less customization, larger bundle size

#### 6. **Chakra UI**
- **Component library** with built-in styling system
- **Benefits**: Excellent accessibility, good TypeScript support
- **Drawbacks**: Less CSS-in-JS control, opinionated design

### Development Tools
- **Build Tool**: Vite
- **Linting**: ESLint + Prettier
- **Type Checking**: TypeScript strict mode
- **Mock Data**: MSW (Mock Service Worker) for API simulation

## Application Architecture

### Styled Components + Radix UI Architecture

#### Component Structure with Styled Components
```
src/
├── components/
│   ├── ui/                    # Reusable UI components
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   └── Button.styles.ts
│   │   ├── Input/
│   │   │   ├── Input.tsx
│   │   │   └── Input.styles.ts
│   │   ├── Modal/
│   │   │   ├── Modal.tsx
│   │   │   └── Modal.styles.ts
│   │   ├── Table/
│   │   │   ├── Table.tsx
│   │   │   └── Table.styles.ts
│   │   └── Calendar/
│   │       ├── Calendar.tsx
│   │       └── Calendar.styles.ts
│   ├── layout/               # Layout components
│   │   ├── Header/
│   │   │   ├── Header.tsx
│   │   │   └── Header.styles.ts
│   │   ├── Sidebar/
│   │   │   ├── Sidebar.tsx
│   │   │   └── Sidebar.styles.ts
│   │   └── Dashboard/
│   │       ├── Dashboard.tsx
│   │       └── Dashboard.styles.ts
│   ├── scheduling/           # Scheduling specific components
│   │   ├── ScheduleGrid/
│   │   │   ├── ScheduleGrid.tsx
│   │   │   └── ScheduleGrid.styles.ts
│   │   ├── ClassCard/
│   │   │   ├── ClassCard.tsx
│   │   │   └── ClassCard.styles.ts
│   │   ├── TimeSlot/
│   │   │   ├── TimeSlot.tsx
│   │   │   └── TimeSlot.styles.ts
│   │   └── ConflictAlert/
│   │       ├── ConflictAlert.tsx
│   │       └── ConflictAlert.styles.ts
│   ├── groups/              # Class group components
│   │   ├── GroupManager/
│   │   │   ├── GroupManager.tsx
│   │   │   └── GroupManager.styles.ts
│   │   ├── GroupCard/
│   │   │   ├── GroupCard.tsx
│   │   │   └── GroupCard.styles.ts
│   │   ├── GroupFilter/
│   │   │   ├── GroupFilter.tsx
│   │   │   └── GroupFilter.styles.ts
│   │   └── MergedSchedule/
│   │       ├── MergedSchedule.tsx
│   │       └── MergedSchedule.styles.ts
│   └── forms/               # Form components
│       ├── ClassForm/
│       │   ├── ClassForm.tsx
│       │   └── ClassForm.styles.ts
│       ├── GroupForm/
│       │   ├── GroupForm.tsx
│       │   └── GroupForm.styles.ts
│       ├── ScheduleForm/
│       │   ├── ScheduleForm.tsx
│       │   └── ScheduleForm.styles.ts
│       └── EnrollmentForm/
│           ├── EnrollmentForm.tsx
│           └── EnrollmentForm.styles.ts
├── pages/                   # Route pages
│   ├── admin/
│   ├── teacher/
│   ├── student/
│   └── parent/
├── hooks/                   # Custom hooks
├── services/               # API services
├── stores/                 # State management
├── styles/                 # Global styles and theme
│   ├── theme.ts
│   ├── globalStyles.ts
│   └── styled.d.ts
└── types/                  # TypeScript types
```

#### Styled Components Benefits
- **Component-based styling**: Each component has its own styled file
- **Dynamic theming**: Easy theme switching and customization
- **TypeScript integration**: Full type safety for props and themes
- **Performance**: CSS-in-JS with optimized rendering
- **Maintainability**: Scoped styles prevent conflicts

#### Radix UI Integration
- **Unstyled components**: Radix provides accessible, unstyled components
- **Styled wrapper pattern**: Wrap Radix components with styled-components
- **Accessibility**: Built-in ARIA attributes and keyboard navigation
- **Composition**: Easy to compose complex components

### Route Structure (React Router 7)

```
/                           # Landing page
├── /auth
│   ├── /login             # Login page
│   └── /register          # Registration page
├── /dashboard             # Main dashboard (protected)
│   ├── /                  # Dashboard home
│   ├── /schedule          # Schedule view
│   ├── /classes           # Class management
│   ├── /groups            # Class group management
│   ├── /teachers          # Teacher management
│   ├── /students          # Student management
│   ├── /classrooms        # Classroom management
│   └── /reports           # Reports and analytics
├── /admin                 # Admin specific routes
│   ├── /                  # Admin dashboard
│   ├── /users             # User management
│   └── /settings          # System settings
├── /teacher               # Teacher specific routes
│   ├── /                  # Teacher dashboard
│   ├── /schedule          # Teacher's schedule
│   └── /classes           # Teacher's classes
├── /student               # Student specific routes
│   ├── /                  # Student dashboard
│   ├── /schedule          # Student's schedule
│   └── /enrollments       # Student's enrollments
└── /parent                # Parent specific routes
    ├── /                  # Parent dashboard
    ├── /schedule          # Family schedule view
    ├── /planning          # Class planning tool
    └── /children          # Children management
```

### Page Components Structure

```
src/
├── pages/
│   ├── auth/
│   │   ├── LoginPage.tsx
│   │   └── RegisterPage.tsx
│   ├── dashboard/
│   │   ├── DashboardPage.tsx
│   │   ├── SchedulePage.tsx
│   │   ├── ClassesPage.tsx
│   │   ├── GroupsPage.tsx
│   │   ├── TeachersPage.tsx
│   │   ├── StudentsPage.tsx
│   │   ├── ClassroomsPage.tsx
│   │   └── ReportsPage.tsx
│   ├── admin/
│   │   ├── AdminDashboardPage.tsx
│   │   ├── UsersPage.tsx
│   │   └── SettingsPage.tsx
│   ├── teacher/
│   │   ├── TeacherDashboardPage.tsx
│   │   ├── TeacherSchedulePage.tsx
│   │   └── TeacherClassesPage.tsx
│   ├── student/
│   │   ├── StudentDashboardPage.tsx
│   │   ├── StudentSchedulePage.tsx
│   │   └── StudentEnrollmentsPage.tsx
│   └── parent/
│       ├── ParentDashboardPage.tsx
│       ├── FamilySchedulePage.tsx
│       ├── PlanningPage.tsx
│       └── ChildrenPage.tsx
```

## State Management with Jotai

### Core Atoms Structure

```typescript
// Authentication atoms
const userAtom = atom<User | null>(null)
const isAuthenticatedAtom = atom((get) => get(userAtom) !== null)
const userRoleAtom = atom((get) => get(userAtom)?.role || null)

// Data atoms
const classesAtom = atom<Class[]>([])
const groupsAtom = atom<ClassGroup[]>([])
const teachersAtom = atom<Teacher[]>([])
const studentsAtom = atom<Student[]>([])
const classroomsAtom = atom<Classroom[]>([])
const schedulesAtom = atom<Schedule[]>([])
const enrollmentsAtom = atom<Enrollment[]>([])

// UI state atoms
const selectedGroupAtom = atom<number | null>(null)
const selectedTimeRangeAtom = atom<TimeRange | null>(null)
const filtersAtom = atom<ScheduleFilters>({
  groupId: null,
  teacherId: null,
  classroomId: null,
  dateRange: null
})

// Modal and form atoms
const activeModalAtom = atom<string | null>(null)
const formDataAtom = atom<Record<string, any>>({})
const isLoadingAtom = atom<boolean>(false)
const errorAtom = atom<string | null>(null)
```

### Derived Atoms (Computed State)

```typescript
// Filtered data atoms
const filteredClassesAtom = atom((get) => {
  const classes = get(classesAtom)
  const filters = get(filtersAtom)
  
  return classes.filter(classItem => {
    if (filters.groupId && classItem.groupId !== filters.groupId) return false
    if (filters.teacherId && classItem.teacherId !== filters.teacherId) return false
    return true
  })
})

const groupedSchedulesAtom = atom((get) => {
  const schedules = get(schedulesAtom)
  const classes = get(classesAtom)
  const groups = get(groupsAtom)
  
  return groups.map(group => ({
    ...group,
    schedules: schedules.filter(schedule => {
      const classItem = classes.find(c => c.id === schedule.classId)
      return classItem?.groupId === group.id
    })
  }))
})

const userScheduleAtom = atom((get) => {
  const user = get(userAtom)
  const schedules = get(schedulesAtom)
  const enrollments = get(enrollmentsAtom)
  
  if (!user) return []
  
  if (user.role === 'STUDENT') {
    const studentEnrollments = enrollments.filter(e => e.studentId === user.id)
    return schedules.filter(s => 
      studentEnrollments.some(e => e.classId === s.classId)
    )
  }
  
  if (user.role === 'TEACHER') {
    return schedules.filter(s => s.teacherId === user.id)
  }
  
  return schedules
})

// Conflict detection atoms
const conflictsAtom = atom((get) => {
  const schedules = get(schedulesAtom)
  return detectConflicts(schedules)
})

// Optimization atoms
const scheduleSuggestionsAtom = atom((get) => {
  const user = get(userAtom)
  const classes = get(classesAtom)
  const schedules = get(schedulesAtom)
  
  if (!user || user.role !== 'PARENT') return []
  
  return generateScheduleSuggestions(user.id, classes, schedules)
})
```

### Action Atoms (State Mutations)

```typescript
// CRUD operations
const addClassAtom = atom(
  null,
  (get, set, newClass: CreateClassData) => {
    const classes = get(classesAtom)
    const newClassWithId = { ...newClass, id: Date.now() }
    set(classesAtom, [...classes, newClassWithId])
  }
)

const updateClassAtom = atom(
  null,
  (get, set, { id, data }: { id: number; data: UpdateClassData }) => {
    const classes = get(classesAtom)
    set(classesAtom, classes.map(c => c.id === id ? { ...c, ...data } : c))
  }
)

const deleteClassAtom = atom(
  null,
  (get, set, id: number) => {
    const classes = get(classesAtom)
    set(classesAtom, classes.filter(c => c.id !== id))
  }
)

// UI actions
const setFilterAtom = atom(
  null,
  (get, set, filters: Partial<ScheduleFilters>) => {
    const currentFilters = get(filtersAtom)
    set(filtersAtom, { ...currentFilters, ...filters })
  }
)

const openModalAtom = atom(
  null,
  (get, set, modalName: string) => {
    set(activeModalAtom, modalName)
  }
)

const closeModalAtom = atom(
  null,
  (get, set) => {
    set(activeModalAtom, null)
    set(formDataAtom, {})
  }
)
```

## Component Architecture

### Core Components

```
src/
├── components/
│   ├── ui/                    # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Select.tsx
│   │   ├── Modal.tsx
│   │   ├── Table.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   ├── Calendar.tsx
│   │   └── LoadingSpinner.tsx
│   ├── layout/               # Layout components
│   │   ├── AppLayout.tsx
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   ├── Navigation.tsx
│   │   └── Breadcrumb.tsx
│   ├── scheduling/           # Scheduling specific components
│   │   ├── ScheduleGrid.tsx
│   │   ├── ScheduleCard.tsx
│   │   ├── TimeSlot.tsx
│   │   ├── ConflictAlert.tsx
│   │   ├── ScheduleCalendar.tsx
│   │   └── ScheduleTimeline.tsx
│   ├── groups/              # Class group components
│   │   ├── GroupManager.tsx
│   │   ├── GroupCard.tsx
│   │   ├── GroupFilter.tsx
│   │   ├── MergedSchedule.tsx
│   │   ├── GroupSelector.tsx
│   │   └── GroupColorPicker.tsx
│   ├── forms/               # Form components
│   │   ├── ClassForm.tsx
│   │   ├── GroupForm.tsx
│   │   ├── ScheduleForm.tsx
│   │   ├── TeacherForm.tsx
│   │   ├── StudentForm.tsx
│   │   ├── EnrollmentForm.tsx
│   │   └── UserForm.tsx
│   ├── modals/              # Modal components
│   │   ├── CreateClassModal.tsx
│   │   ├── EditClassModal.tsx
│   │   ├── CreateGroupModal.tsx
│   │   ├── ScheduleConflictModal.tsx
│   │   └── ConfirmationModal.tsx
│   └── charts/              # Data visualization
│       ├── ScheduleChart.tsx
│       ├── EnrollmentChart.tsx
│       └── UtilizationChart.tsx
```

### Key Component Specifications

#### 1. ScheduleGrid Component
- **Purpose**: Main scheduling interface
- **Features**: 
  - Weekly/daily view toggle
  - Drag and drop scheduling
  - Conflict highlighting
  - Group filtering
  - Time slot management

#### 2. GroupManager Component
- **Purpose**: Manage class groups
- **Features**:
  - Create/edit/delete groups
  - Assign classes to groups
  - Set group colors
  - Manage group capacity

#### 3. MergedSchedule Component
- **Purpose**: Display grouped class schedules
- **Features**:
  - Combined schedule view
  - Overlapping time slot handling
  - Group-specific filtering
  - Conflict indicators

#### 4. PlanningTool Component
- **Purpose**: Parent planning interface
- **Features**:
  - Schedule optimization suggestions
  - Conflict-free planning
  - Joint class recommendations
  - Family schedule view

## Mock Data Structure

### Data Types

```typescript
interface User {
  id: number
  email: string
  name: string
  role: 'ADMIN' | 'TEACHER' | 'STUDENT' | 'PARENT'
  avatar?: string
}

interface ClassGroup {
  id: number
  name: string
  description: string
  colorCode: string
  maxCapacity: number
  createdAt: string
}

interface Class {
  id: number
  name: string
  subject: string
  teacherId: number
  groupId: number
  maxStudents: number
  description?: string
}

interface Teacher {
  id: number
  userId: number
  subjects: string[]
  availabilityPreferences: AvailabilityPreference[]
}

interface Student {
  id: number
  userId: number
  gradeLevel: string
  enrollmentDate: string
  parentId?: number
}

interface Schedule {
  id: number
  classId: number
  classroomId: number
  dayOfWeek: number
  startTime: string
  endTime: string
  isRecurring: boolean
  startDate?: string
  endDate?: string
}

interface Enrollment {
  id: number
  studentId: number
  classId: number
  enrollmentDate: string
  status: 'ACTIVE' | 'INACTIVE' | 'WAITLIST'
}
```

### Mock Data Examples

```typescript
// Sample mock data
const mockGroups = [
  { id: 1, name: 'Sports', description: 'Physical activities', colorCode: '#3B82F6', maxCapacity: 50 },
  { id: 2, name: 'Music', description: 'Musical instruments and theory', colorCode: '#10B981', maxCapacity: 30 },
  { id: 3, name: 'Arts', description: 'Creative arts and crafts', colorCode: '#F59E0B', maxCapacity: 25 }
]

const mockClasses = [
  { id: 1, name: 'Gymnastics', subject: 'Physical Education', teacherId: 1, groupId: 1, maxStudents: 15 },
  { id: 2, name: 'Contemporary Dance', subject: 'Dance', teacherId: 2, groupId: 1, maxStudents: 12 },
  { id: 3, name: 'Guitar', subject: 'Music', teacherId: 3, groupId: 2, maxStudents: 8 },
  { id: 4, name: 'Piano', subject: 'Music', teacherId: 4, groupId: 2, maxStudents: 6 }
]
```

## Implementation Phases

### Phase 1: Foundation & Core Components (Week 1)
1. **Project Setup**
   - Configure React 19 with TypeScript
   - Set up React Router 7 (Data Router)
   - Set up Jotai for state management
   - Configure Styled Components and Radix UI
   - Set up development environment and tooling

2. **Core Components**
   - Create reusable UI components (Button, Input, Modal, etc.)
   - Implement layout components (Header, Sidebar, Navigation)
   - Set up routing structure with React Router 7
   - Create basic page components

3. **State Management**
   - Set up Jotai atoms for authentication
   - Create data atoms for mock data
   - Implement UI state atoms
   - Set up derived atoms for computed state

### Phase 2: Authentication & Basic CRUD (Week 2)
1. **Authentication System**
   - Implement login/logout functionality
   - Create role-based routing
   - Set up protected routes
   - Create user context and state management

2. **Basic CRUD Operations**
   - Create form components for all entities
   - Implement create, read, update, delete operations
   - Set up modal system for forms
   - Create data validation with Zod

3. **Mock Data Integration**
   - Set up comprehensive mock data
   - Implement data persistence in localStorage
   - Create data service layer
   - Set up MSW for API simulation

### Phase 3: Scheduling & Group Management (Week 3)
1. **Schedule Management**
   - Create ScheduleGrid component
   - Implement schedule creation and editing
   - Add conflict detection and highlighting
   - Create schedule viewing components

2. **Class Group Management**
   - Create GroupManager component
   - Implement group creation and editing
   - Add class assignment to groups
   - Create group filtering functionality

3. **Merged Schedule Views**
   - Create MergedSchedule component
   - Implement grouped schedule display
   - Handle overlapping time slots
   - Add group-specific filtering

### Phase 4: Advanced Features & Optimization (Week 4)
1. **Parent Planning Interface**
   - Create PlanningTool component
   - Implement schedule optimization suggestions
   - Add conflict-free planning
   - Create family schedule view

2. **Advanced Scheduling**
   - Implement recurring schedules
   - Add schedule conflict resolution
   - Create schedule export functionality
   - Add calendar integration

3. **Performance Optimization**
   - Implement virtual scrolling for large lists
   - Add memoization for expensive calculations
   - Optimize re-renders with Jotai
   - Add lazy loading for components

### Phase 5: Polish & Testing (Week 5)
1. **UI/UX Polish**
   - Refine component styling
   - Add animations and transitions
   - Implement responsive design
   - Add accessibility features

2. **Testing**
   - Write unit tests for components
   - Add integration tests for user flows
   - Test state management with Jotai
   - Add E2E tests for critical paths

3. **Documentation**
   - Create component documentation
   - Document state management patterns
   - Write user guides
   - Create development setup guide

## Key Features Implementation

### 1. Class Grouping System
- **Group Creation**: Admin can create class groups with colors and descriptions
- **Class Assignment**: Classes can be assigned to groups
- **Group Filtering**: Schedules can be filtered by group
- **Merged Views**: Combined schedule display for grouped classes

### 2. Schedule Conflict Detection
- **Real-time Detection**: Conflicts are detected as schedules are created
- **Visual Indicators**: Conflicts are highlighted in the UI
- **Conflict Resolution**: Tools to resolve scheduling conflicts
- **Teacher/Classroom Conflicts**: Prevent double-booking

### 3. Parent Planning Tools
- **Schedule Optimization**: Suggest optimal class combinations
- **Conflict-free Planning**: Help parents avoid scheduling conflicts
- **Joint Class Planning**: Plan multiple activities for children
- **Family Schedule View**: View all family members' schedules

### 4. Role-based Interfaces
- **Admin Dashboard**: Full system management
- **Teacher Interface**: View and manage assigned classes
- **Student Interface**: View personal schedule and enrollments
- **Parent Interface**: Plan and manage children's schedules

## State Management Patterns

### 1. Authentication Pattern
```typescript
// Centralized auth state
const useAuth = () => {
  const [user, setUser] = useAtom(userAtom)
  const [isAuthenticated] = useAtom(isAuthenticatedAtom)
  
  const login = useCallback(async (credentials) => {
    // Mock login logic
    const mockUser = { id: 1, email: credentials.email, role: 'ADMIN' }
    setUser(mockUser)
  }, [setUser])
  
  const logout = useCallback(() => {
    setUser(null)
  }, [setUser])
  
  return { user, isAuthenticated, login, logout }
}
```

### 2. CRUD Pattern
```typescript
// Generic CRUD operations
const useEntityCRUD = <T>(entityAtom: Atom<T[]>) => {
  const [entities, setEntities] = useAtom(entityAtom)
  
  const add = useCallback((item: Omit<T, 'id'>) => {
    const newItem = { ...item, id: Date.now() } as T
    setEntities(prev => [...prev, newItem])
  }, [setEntities])
  
  const update = useCallback((id: number, updates: Partial<T>) => {
    setEntities(prev => prev.map(item => 
      (item as any).id === id ? { ...item, ...updates } : item
    ))
  }, [setEntities])
  
  const remove = useCallback((id: number) => {
    setEntities(prev => prev.filter(item => (item as any).id !== id))
  }, [setEntities])
  
  return { entities, add, update, remove }
}
```

### 3. Filtering Pattern
```typescript
// Computed filtered state
const useFilteredData = <T>(
  dataAtom: Atom<T[]>,
  filterAtom: Atom<FilterCriteria>
) => {
  const [data] = useAtom(dataAtom)
  const [filters] = useAtom(filterAtom)
  
  const filteredData = useMemo(() => {
    return data.filter(item => {
      // Apply filters based on criteria
      return true // Simplified for example
    })
  }, [data, filters])
  
  return filteredData
}
```

## Performance Considerations

### 1. Jotai Optimization
- Use `atomFamily` for large lists
- Implement proper atom splitting
- Use `useAtomValue` and `useSetAtom` for read/write separation
- Leverage derived atoms for computed state
- Utilize React 19's concurrent features with Jotai

### 2. Component Optimization
- Memoize expensive calculations with React 19's enhanced memoization
- Use React.memo for pure components
- Implement virtual scrolling for large lists
- Lazy load non-critical components
- Leverage React 19's automatic batching improvements

### 3. State Optimization
- Keep atoms granular and focused
- Use localStorage for persistence
- Implement proper cleanup on unmount
- Optimize re-renders with proper atom design

## Testing Strategy

### 1. Unit Testing
- Test individual components in isolation
- Test Jotai atoms and derived state
- Test utility functions and helpers
- Mock external dependencies

### 2. Integration Testing
- Test component interactions
- Test user workflows
- Test state management flows
- Test routing and navigation

### 3. E2E Testing
- Test complete user journeys
- Test authentication flows
- Test scheduling workflows
- Test role-based access

## Next Steps

1. **Immediate Actions**
   - Set up React 19 project structure
   - Configure React Router 7 (Data Router)
   - Configure Jotai for state management
   - Create basic component architecture
   - Set up mock data structure

2. **Development Workflow**
   - Implement components incrementally
   - Test each feature as it's built
   - Document patterns and conventions
   - Prepare for backend integration

3. **Future Considerations**
   - Plan API integration strategy
   - Design data migration from mock to real
   - Consider real-time updates
   - Plan for production deployment

---

*This frontend plan provides a complete roadmap for building the UI layer with modern React patterns, focusing on maintainability, performance, and user experience.* 