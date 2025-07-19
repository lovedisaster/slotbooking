// ============================================================================
// SCHOOL TIME SCHEDULER - DATA MODELS & RELATIONSHIPS
// ============================================================================

// ============================================================================
// CORE USER MODELS
// ============================================================================

export interface User {
  id: number;
  email: string;
  name: string;
  role: 'ADMIN' | 'TEACHER' | 'STUDENT' | 'PARENT';
  avatar?: string;
  phone?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Admin extends User {
  role: 'ADMIN';
  permissions: Permission[];
  schoolId: number;
}

export interface Teacher extends User {
  role: 'TEACHER';
  subjects: Subject[];
  qualifications: string[];
  experience: number; // years
  availability: TeacherAvailability[];
  schoolId: number;
}

export interface Student extends User {
  role: 'STUDENT';
  grade: number;
  classId: number;
  parentId: number;
  emergencyContact: EmergencyContact;
  schoolId: number;
}

export interface Parent extends User {
  role: 'PARENT';
  children: Student[];
  phone: string;
  address: Address;
  schoolId: number;
}

// ============================================================================
// SCHOOL & ORGANIZATION MODELS
// ============================================================================

export interface School {
  id: number;
  name: string;
  address: Address;
  phone: string;
  email: string;
  principal: string;
  academicYear: string;
  isActive: boolean;
  settings: SchoolSettings;
  createdAt: Date;
  updatedAt: Date;
}

export interface SchoolSettings {
  id: number;
  schoolId: number;
  periodDuration: number; // minutes
  breakDuration: number; // minutes
  lunchDuration: number; // minutes
  startTime: string; // "08:00"
  endTime: string; // "15:30"
  maxPeriodsPerDay: number;
  maxPeriodsPerWeek: number;
  allowConflicts: boolean;
  autoSchedule: boolean;
}

export interface Address {
  id: number;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

// ============================================================================
// ACADEMIC MODELS
// ============================================================================

export interface Class {
  id: number;
  name: string; // "Grade 10A"
  grade: number;
  section: string; // "A", "B", "C"
  schoolId: number;
  teacherId: number; // Class teacher
  capacity: number;
  currentEnrollment: number;
  academicYear: string;
  isActive: boolean;
  students: Student[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Subject {
  id: number;
  name: string; // "Mathematics", "Physics"
  code: string; // "MATH101", "PHY201"
  description: string;
  credits: number;
  schoolId: number;
  teachers: Teacher[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Course {
  id: number;
  name: string; // "Advanced Mathematics"
  subjectId: number;
  classId: number;
  teacherId: number;
  academicYear: string;
  semester: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================================================
// SCHEDULING MODELS
// ============================================================================

export interface Period {
  id: number;
  name: string; // "Period 1", "Lunch", "Break"
  startTime: string; // "08:00"
  endTime: string; // "08:45"
  duration: number; // minutes
  type: 'CLASS' | 'BREAK' | 'LUNCH' | 'ASSEMBLY';
  schoolId: number;
  order: number; // 1, 2, 3...
  isActive: boolean;
}

export interface Schedule {
  id: number;
  name: string; // "Grade 10 Schedule 2024"
  schoolId: number;
  academicYear: string;
  isActive: boolean;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
  scheduleItems: ScheduleItem[];
}

export interface ScheduleItem {
  id: number;
  scheduleId: number;
  dayOfWeek: number; // 1=Monday, 2=Tuesday, etc.
  periodId: number;
  courseId: number;
  classroomId: number;
  teacherId: number;
  classId: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Classroom {
  id: number;
  name: string; // "Room 101", "Science Lab 1"
  number: string;
  building: string;
  floor: number;
  capacity: number;
  type: 'CLASSROOM' | 'LAB' | 'GYM' | 'AUDITORIUM' | 'LIBRARY';
  equipment: string[];
  schoolId: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================================================
// AVAILABILITY & CONSTRAINTS
// ============================================================================

export interface TeacherAvailability {
  id: number;
  teacherId: number;
  dayOfWeek: number; // 1=Monday, 2=Tuesday, etc.
  startTime: string; // "08:00"
  endTime: string; // "16:00"
  isAvailable: boolean;
  reason?: string; // "Part-time", "Medical leave"
  academicYear: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Constraint {
  id: number;
  name: string; // "No Math on Fridays", "Lab sessions only in Science Lab"
  type: 'TEACHER' | 'CLASS' | 'SUBJECT' | 'CLASSROOM' | 'GLOBAL';
  description: string;
  rule: string; // JSON or rule definition
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  isActive: boolean;
  schoolId: number;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================================================
// NOTIFICATION & COMMUNICATION
// ============================================================================

export interface Notification {
  id: number;
  userId: number;
  title: string;
  message: string;
  type: 'INFO' | 'WARNING' | 'ERROR' | 'SUCCESS';
  isRead: boolean;
  createdAt: Date;
  expiresAt?: Date;
}

export interface EmergencyContact {
  id: number;
  name: string;
  relationship: string; // "Father", "Mother", "Guardian"
  phone: string;
  email?: string;
  address: Address;
  isPrimary: boolean;
}

// ============================================================================
// SYSTEM & PERMISSION MODELS
// ============================================================================

export interface Permission {
  id: number;
  name: string; // "CREATE_SCHEDULE", "VIEW_STUDENTS"
  description: string;
  resource: string; // "schedule", "student"
  action: string; // "create", "read", "update", "delete"
  isActive: boolean;
}

export interface Role {
  id: number;
  name: string; // "ADMIN", "TEACHER", "STUDENT", "PARENT"
  description: string;
  permissions: Permission[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================================================
// RELATIONSHIP MAPPINGS
// ============================================================================

/*
ENTITY RELATIONSHIPS:

1. SCHOOL (1) ←→ (Many) USERS (Admin, Teacher, Student, Parent)
   - School has many users
   - Each user belongs to one school

2. SCHOOL (1) ←→ (Many) CLASSES
   - School has many classes
   - Each class belongs to one school

3. SCHOOL (1) ←→ (Many) SUBJECTS
   - School has many subjects
   - Each subject belongs to one school

4. SCHOOL (1) ←→ (Many) CLASSROOMS
   - School has many classrooms
   - Each classroom belongs to one school

5. SCHOOL (1) ←→ (Many) SCHEDULES
   - School has many schedules
   - Each schedule belongs to one school

6. CLASS (1) ←→ (Many) STUDENTS
   - Class has many students
   - Each student belongs to one class

7. CLASS (1) ←→ (Many) COURSES
   - Class has many courses
   - Each course belongs to one class

8. SUBJECT (1) ←→ (Many) COURSES
   - Subject has many courses
   - Each course belongs to one subject

9. TEACHER (1) ←→ (Many) COURSES
   - Teacher teaches many courses
   - Each course has one teacher

10. TEACHER (1) ←→ (Many) SUBJECTS
    - Teacher can teach many subjects
    - Subject can be taught by many teachers (Many-to-Many)

11. TEACHER (1) ←→ (Many) TEACHER_AVAILABILITY
    - Teacher has many availability slots
    - Each availability belongs to one teacher

12. SCHEDULE (1) ←→ (Many) SCHEDULE_ITEMS
    - Schedule has many items
    - Each item belongs to one schedule

13. SCHEDULE_ITEM (Many) ←→ (1) PERIOD
    - Many schedule items can use the same period
    - Each schedule item has one period

14. SCHEDULE_ITEM (Many) ←→ (1) CLASSROOM
    - Many schedule items can use the same classroom
    - Each schedule item has one classroom

15. PARENT (1) ←→ (Many) STUDENTS
    - Parent has many children (students)
    - Each student has one parent

16. USER (1) ←→ (Many) NOTIFICATIONS
    - User has many notifications
    - Each notification belongs to one user

17. ROLE (1) ←→ (Many) PERMISSIONS
    - Role has many permissions
    - Permission can belong to many roles (Many-to-Many)

18. SCHOOL (1) ←→ (Many) CONSTRAINTS
    - School has many scheduling constraints
    - Each constraint belongs to one school
*/

// ============================================================================
// MOCK DATA TYPES
// ============================================================================

export interface MockData {
  schools: School[];
  users: User[];
  classes: Class[];
  subjects: Subject[];
  courses: Course[];
  periods: Period[];
  schedules: Schedule[];
  scheduleItems: ScheduleItem[];
  classrooms: Classroom[];
  teacherAvailabilities: TeacherAvailability[];
  constraints: Constraint[];
  notifications: Notification[];
  permissions: Permission[];
  roles: Role[];
}

// ============================================================================
// API RESPONSE TYPES
// ============================================================================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
} 