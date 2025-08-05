export {};

declare global {
  interface IBackendRes<T> {
    status: boolean;
    EC: number;
    message: string;
    data?: T | null;
  }

  interface IUser {
    _id: string;
    name: string;
    email: string;
    phone: string;
    role: string;
    type: string;
    is_active?: boolean;
    avatar?: string;
    location?: string;
    createdAt: string;
    updatedAt: string;
  }

  interface IUpdate {
    acknowledged: boolean;
    modifiedCount: number;
    upsertedId: null;
    upsertedCount: number;
    matchedCount: number;
  }

  interface IDelete {
    acknowledged: true;
    deletedCount: 0;
  }

  interface IPaginate {
    users: IUser[];
    total: number;
    page: number;
    limit: number;
  }
  interface ILogin {
    access_token: string;
    refresh_token: string;
    user: {
      _id: string;
      email: string;
      name: string;
      role: string;
      phone: string;
      type: string;
      avatar?: string;
      location?: string;
      createdAt: string;
      updatedAt: string;
    };
  }

  interface IRegister {
    _id: string;
    name: string;
    email: string;
    phone: string;
    role: string;
    type: string;
    is_active: boolean;
    deleted: boolean;
    createAt: Date;
    updateAt: Date;
    location?: string;
    createdAt: string;
    updatedAt: string;
  }

  interface ILogout {
    userID: string;
  }

  interface IRefresh {
    access_token: string;
  }

  interface IFetchAccount {
    _id: string;
    user_id: string;
    created_at: Date;
    expire: Date;
    refresh_token: string;
  }

  interface IVerifyOtp {
    verify_token: string;
  }

  interface ICourses {
    _id: string;
    title: string;
    type: string;
    thumbnail: string;
  }

  interface IUpload {
    url: string;
    filename: string;
  }

  interface ILesson {
    title: string;
    type: string;
    level: string;
    courses: {
      id: string;
      type: string;
    };
    time: number;
    _id: string;
  }

  interface IQuestion {
    lesson: {
      id: string;
      level: string;
    };
    question_type: string;
    question_text: string;
    options?: {
      [key: string]: string;
    };
    correct_answer_key?: string;
    correct_answer_text?: string;
    _id: string;
  }

  interface IAnswer {
    user_id: string;
    lesson_id: string;
    question_id: string;
    question_type: string;
    user_answer_key?: string;
    user_answer_text?: string;
    _id: string;
    score?: number;
    is_correct: boolean;
  }
  interface IAnswerPost {
    user_id: string;
    lesson_id: string;
    question_id: string;
    question_type?: string;
    user_answer_key?: string;
    user_answer_text?: string;
  }

  interface ICourses {
    _id: string;
    title: string;
    thumbnail: string;
    type: string;
    description?: string;
  }

  interface ILesson {
    courses: {
      id: string;
      type: string;
    };
    _id: string;
    title: string;
    type: string;
    level: string;
  }

  interface IReview {
    _id: string;
    userID: string;
    userName: string;
    lessonID: string;
    rating: number;
    comment: string;
    createdAt?: string;
    updatedAt?: string;
  }

  interface IProgressCourses {
    _id: string;
    userId: string;
    coursesId: string;
    lessonsIdComplete: string[];
    progress?: number;
    completed?: boolean;
    createdAt?: string;
    updatedAt?: string;
  }
}
