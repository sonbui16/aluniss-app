import {
  APP_HIDE_TABBAR,
  APP_SET_HEIGHT_TABBAR,
  APP_LIST_ITEM,
  SAVE_LIST_ITEM,
  APP_SOURSE_DETAIL,
  APP_TREND_SEARCH,
  APP_SEARCH_COURSE,
  APP_LIST_MY_COURSE,
  SAVE_LIST_MY_COURSE,
  APP_DISCUSSIONS_NOTE,
  APP_LEARN,
  GET_LOCATION,
  APP_LIST_SOURCE_CATEGORY,
  SAVE_LIST_SOURCE_CATEGORY,
  APP_SOURSE_DISCUSSION,
  APP_DOWNLOAD_FILE,
  APP_RATING_COURSE,
  APP_ACTIVE_COURSE,
  APP_ADD_DISCUSSIONS,
  APP_ADD_NOTE,
  APP_DETAIL_COMBO,
  APP_SAVE_LANGUAGE,
  APP_UPDATE_PROFILE,
  SAVE_PROFILE_USER,
  APP_CATEGORY_DETAIL,
  APP_NOTIFICATION,
  APP_READ_NOTI,
  APP_DETAIL_COURSE,
  SAVE_SOURCE_LIST,
  APP_DETAIL_COMBO_COURSE,
  APP_SAVE_LOGIN,
  APP_TYPE_PAYMENT,
  APP_COMPLETE_LESSON,
  APP_CHECK_CLOSE_LESSON,
  APP_UPLOAD_AVATAR,
  APP_COURSE_DONE,
  APP_RIGISTER_FACEBOOK,
  APP_GET_INFO,
  APP_GET_QUIZ_DETAIL,
  APP_GET_PUBLIC_QUIZES,
  APP_GET_LIST_CATEGORY,
  APP_GET_QUIZ_QUESTIONS,
  APP_SUBMIT_QUIZ,
  APP_GET_RESULT_DETAIL,
  APP_GET_ACTIVITY,
  APP_CHANGE_VIEW_SITE,
  APP_DELETE_ACOUNT,
  APP_CHECK_PASS,
  APP_CHECK_DEVICE,
  APP_BLOGS,
  APP_DETAIL_BLOG,
  APP_DOCUMENTS,
  APP_DETAIL_DOCUMENT,
  APP_LIST_COURSE,
  APP_LIST_COURSE1,
  APP_SEARCH_BLOGS,
  APP_SEARCH_DOCUMENTS,
  APP_COURSES,
  APP_INFOR_TEACHER,
  APP_TRIAL_LESSONS,
  APP_REFRESH,
  APP_INFOR_USER,
  APP_COURSES_ME,
  APP_LIST_LESSONS,
  APP_LESSONS_ID,
  APP_CATEGORIES,
  APP_SEARCH_COURSE_ME,
  APP_COURSES_DETAIL,
  APP_USERS_ME,
  APP_SAVE_RECEIPT,
  APP_All_CALENDAR,
  APP_DELETE_LEAVE_CALENDAR,
  APP_LEAVE_CALENDAR,
  APP_CALENDAR_CHECKIN,
  APP_ACCEPT_CALENDAR,
  APP_SELECT_CALENDAR,
  APP_LIST_SCHEDULE_EVENTS,
  APP_COMBO_QUIZ_TEST,
  APP_LIST_QUIZ_TEST,
  APP_STUDENT_MAP_COMBO,
} from './types';
export const allCalendar = (...args) => ({type: APP_All_CALENDAR, args});
export const deleteLeaveCalendar = (...args) => ({
  type: APP_DELETE_LEAVE_CALENDAR,
  args,
});
export const leaveCalendar = (...args) => ({type: APP_LEAVE_CALENDAR, args});
export const calendarCheckin = (...args) => ({
  type: APP_CALENDAR_CHECKIN,
  args,
});
export const acceptCalendar = (...args) => ({type: APP_ACCEPT_CALENDAR, args});
export const selectCalendar = (...args) => ({type: APP_SELECT_CALENDAR, args});
export const listScheduleEvents = (...args) => ({
  type: APP_LIST_SCHEDULE_EVENTS,
  args,
});

export const comboQuizTest = (...args) => ({type: APP_COMBO_QUIZ_TEST, args});
export const listQuizTest = (...args) => ({type: APP_LIST_QUIZ_TEST, args});
export const studentMapCombo = (...args) => ({
  type: APP_STUDENT_MAP_COMBO,
  args,
});

export const courses = (...args) => ({type: APP_COURSES, args});
export const inforTeacher = (...args) => ({type: APP_INFOR_TEACHER, args});
export const trialLessons = (...args) => ({type: APP_TRIAL_LESSONS, args});
export const refresh = (...args) => ({type: APP_REFRESH, args});
export const inforUser = (...args) => ({type: APP_INFOR_USER, args});
export const courseMe = (...args) => ({type: APP_COURSES_ME, args});
export const listLesson = (...args) => ({type: APP_LIST_LESSONS, args});
export const lessonsID = (...args) => ({type: APP_LESSONS_ID, args});
export const categories = (...args) => ({type: APP_CATEGORIES, args});
export const coursesDetail = (...args) => ({type: APP_COURSES_DETAIL, args});
export const usersMe = (...args) => ({type: APP_USERS_ME, args});
export const saveReceipt = (...args) => ({type: APP_SAVE_RECEIPT, args});

export const getLocation = (...args) => ({type: GET_LOCATION, args});
export const listmycourse = (...args) => ({type: APP_LIST_MY_COURSE, args});
export const listCourse = (...args) => ({type: APP_LIST_COURSE, args});
export const listCourse1 = (...args) => ({type: APP_LIST_COURSE1, args});
export const blogs = (...args) => ({type: APP_BLOGS, args});
export const searchBlogs = (...args) => ({type: APP_SEARCH_BLOGS, args});
export const searchCourseMe = (...args) => ({type: APP_SEARCH_COURSE_ME, args});

export const searchDocuments = (...args) => ({
  type: APP_SEARCH_DOCUMENTS,
  args,
});
export const blog = (...args) => ({type: APP_DETAIL_BLOG, args});
export const documents = (...args) => ({type: APP_DOCUMENTS, args});
export const document = (...args) => ({type: APP_DETAIL_DOCUMENT, args});
export const listItem = (...args) => ({type: APP_LIST_ITEM, args});
export const sourseDetail = (...args) => ({type: APP_SOURSE_DETAIL, args});
export const checkPass = (...args) => ({type: APP_CHECK_PASS, args});
export const checkDevice = (...args) => ({type: APP_CHECK_DEVICE, args});
export const trendsearch = (...args) => ({type: APP_TREND_SEARCH, args});
export const searchcourse = (...args) => ({type: APP_SEARCH_COURSE, args});
export const discussionsNote = (...args) => ({
  type: APP_DISCUSSIONS_NOTE,
  args,
});
export const learn = (...args) => ({type: APP_LEARN, args});
export const listSourceCategory = (...args) => ({
  type: APP_LIST_SOURCE_CATEGORY,
  args,
});
export const addDiscussions = (...args) => ({type: APP_ADD_DISCUSSIONS, args});
export const addNote = (...args) => ({type: APP_ADD_NOTE, args});
export const course_discussion = (...args) => ({
  type: APP_SOURSE_DISCUSSION,
  args,
});
export const saveLanguage = data => ({
  type: APP_SAVE_LANGUAGE,
  payload: data,
});
export const downloadfile = (...args) => ({type: APP_DOWNLOAD_FILE, args});
export const ratingCourse = (...args) => ({type: APP_RATING_COURSE, args});
export const detailCombo = (...args) => ({type: APP_DETAIL_COMBO, args});
export const detailCourse = (...args) => ({type: APP_DETAIL_COURSE, args});
export const updateProfile = (...args) => ({type: APP_UPDATE_PROFILE, args});
export const notification = (...args) => ({type: APP_NOTIFICATION, args});
export const readnoti = (...args) => ({type: APP_READ_NOTI, args});

export const deleteAcount = (...args) => ({type: APP_DELETE_ACOUNT, args});
export const activeCourse = (...args) => ({type: APP_ACTIVE_COURSE, args});
export const detailComboCourse = (...args) => ({
  type: APP_DETAIL_COMBO_COURSE,
  args,
});
export const completeLesson = (...args) => ({type: APP_COMPLETE_LESSON, args});
export const checkCloseLesson = (...args) => ({
  type: APP_CHECK_CLOSE_LESSON,
  args,
});
export const uploadAvatar = (...args) => ({type: APP_UPLOAD_AVATAR, args});
export const courseDone = (...args) => ({type: APP_COURSE_DONE, args});
export const registerFacebook = (...args) => ({
  type: APP_RIGISTER_FACEBOOK,
  args,
});
export const getAppInfo = (...args) => ({type: APP_GET_INFO, args});
export const getPublicQuizes = (...args) => ({
  type: APP_GET_PUBLIC_QUIZES,
  args,
});
export const getQuizDetail = (...args) => ({type: APP_GET_QUIZ_DETAIL, args});
export const getListCategory = (...args) => ({
  type: APP_GET_LIST_CATEGORY,
  args,
});
export const getQuizQuestions = (...args) => ({
  type: APP_GET_QUIZ_QUESTIONS,
  args,
});
export const submitQuiz = (...args) => ({type: APP_SUBMIT_QUIZ, args});
export const getResultDetail = (...args) => ({
  type: APP_GET_RESULT_DETAIL,
  args,
});
export const getActivity = (...args) => ({type: APP_GET_ACTIVITY, args});
export const changeViewSite = (...args) => ({type: APP_CHANGE_VIEW_SITE, args});
export const hideTabbar = tabBarVisible => ({
  type: APP_HIDE_TABBAR,
  payload: tabBarVisible,
});
export const setHeightTabbar = heightTabbar => ({
  type: APP_SET_HEIGHT_TABBAR,
  payload: heightTabbar,
});
export const saveListItem = data => ({
  type: SAVE_LIST_ITEM,
  payload: data,
});
export const saveListSourceCategory = data => ({
  type: SAVE_LIST_SOURCE_CATEGORY,
  payload: data,
});
export const saveListMyCourse = data => ({
  type: SAVE_LIST_MY_COURSE,
  payload: data,
});
export const saveProfileUser = data => ({
  type: SAVE_PROFILE_USER,
  payload: data,
});
export const saveSourceList = data => ({
  type: SAVE_SOURCE_LIST,
  payload: data,
});
export const saveLogin = data => ({
  type: APP_SAVE_LOGIN,
  payload: data,
});
