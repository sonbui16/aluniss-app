// Create action-types to use call api, save data to reducer or to do something

export const APP_HIDE_TABBAR = 'app/hideTabbar';
export const APP_SET_HEIGHT_TABBAR = 'app/setHeightTabbar';

/**
 * AUTH - Mấy thứ liên quan đến đăng nhập đăng xuất, lưu thông tin, trạng thái đăng nhập -- auth.js
 */
export const APP_SET_AUTH_STATE = "app/setAuthState";
export const APP_SAVE_LOGGED_USER = "app/saveLoggedUser";
export const APP_REMOVE_LOGGED_USER = "app/removeLoggedUser";

export const APP_LOGIN = "app/login";
export const APP_LOGIN1 = "app/login1";

export const APP_LOGIN_FACEBOOK = "app/loginFacebook";
export const APP_LOGOUT = "app/logout";
export const APP_RIGISTER = "app/register";
export const APP_CHANGE_PASS = "app/changePass";
export const APP_PROFILE_USER = "app/profileUser";
export const APP_COURSES_DETAIL = 'app/coursesDetail';
export const APP_USERS_ME = 'app/usersMe';

export const APP_SAVE_RECEIPT = 'app/saveReceipt';
export const APP_SAVE_INFO_SITE = 'app/saveInfoSite';
export const APP_SAVE_SOCKET = 'app/saveSocket';

export const APP_SAVE_INFO_USER = 'app/saveInfoUser';



export const APP_INFO_SITES = 'app/infoSites';



/**
 * REQUEST - Kiểm tra trạng thái của 1 request lên server: pending, success, failure -- Xem thêm trong reducers - common.js
 */
export const MARK_REQUEST_PENDING = "request/requestPending";
export const MARK_REQUEST_SUCCESS = "request/requestSuccess";
export const MARK_REQUEST_FAILED = "request/requestFailed";
export const MARK_REQUEST_CANCELLED = "request/requestCancelled";
export const INVOKE_CALLBACK = 'request/invokeCallBack';
export const GET_LOCATION = "app/getLocation";
export const APP_LIST_ITEM ="app/listItem";
export const SAVE_LIST_ITEM = "app/saveListItem";
export const APP_SOURSE_DETAIL = "app/sourseDetail";
export const APP_TREND_SEARCH = "app/trendsearch";
export const APP_SEARCH_COURSE = "app/searchcourse";
export const APP_LIST_MY_COURSE = "app/listmycourse";
export const APP_BLOGS = "app/blogs";

export const APP_SEARCH_BLOGS = "app/searchBlogs";
export const APP_SEARCH_COURSE_ME = "app/searchCourseMe";


export const APP_SEARCH_DOCUMENTS = "app/searchDocuments";


export const APP_DETAIL_BLOG = "app/blog";
export const APP_DOCUMENTS = "app/documents";
export const APP_DETAIL_DOCUMENT = "app/document";

export const SAVE_LIST_MY_COURSE = "app/saveListMyCourse";
export const APP_DISCUSSIONS_NOTE = "app/discussionsNote";
export const APP_LEARN = "app/learn";
export const APP_LIST_SOURCE_CATEGORY = "app/listSourceCategory";
export const APP_DETAIL_COURSE = "app/detailCourse";
export const APP_ACTIVE_COURSE = "app/activeCourse";
export const SAVE_LIST_SOURCE_CATEGORY = "app/saveListSourceCategory";
export const APP_ADD_DISCUSSIONS = "app/addDiscussions";
export const APP_ADD_NOTE = "app/addNote";
export const APP_SOURSE_DISCUSSION = "app/course_discussion";
export const APP_DOWNLOAD_FILE = "app/downloadfile";
export const APP_RATING_COURSE = "app/ratingCourse";
export const APP_DETAIL_COMBO = "app/detailCombo";
export const APP_UPDATE_PROFILE = "app/updateProfile";
export const SAVE_PROFILE_USER = "app/saveProfileUser";
export const APP_NOTIFICATION = "app/notification";
export const APP_READ_NOTI = "app/readnoti";

export const SAVE_SOURCE_LIST = "app/saveSourceList";
export const APP_SAVE_LOGIN = "app/saveLogin";
export const APP_SAVE_MEM_SITE = "app/saveMemSite";
export const APP_SAVE_LIST_SITE = "app/APP_SAVE_LIST_SITE";
export const APP_DETAIL_COMBO_COURSE = "app/detailComboCourse";
export const APP_COMPLETE_LESSON = "app/completeLesson";
export const APP_CHECK_CLOSE_LESSON = "app/checkCloseLesson";
export const APP_UPLOAD_AVATAR = "app/uploadAvatar";
export const APP_COURSE_DONE = "app/courseDone";
export const APP_RIGISTER_FACEBOOK = "app/registerFacebook";
export const APP_GET_INFO =" app/getInfo";
export const APP_GET_PUBLIC_QUIZES="app/getPublicQuizes";
export const APP_GET_QUIZ_DETAIL="app/getQuizDetail";
export const APP_GET_LIST_CATEGORY="app/getListCategory";
export const APP_GET_QUIZ_QUESTIONS="app/getQuizQuestions";
export const APP_SUBMIT_QUIZ="app/submitQuiz";
export const APP_GET_RESULT_DETAIL="app/getResultDetail";
export const APP_GET_ACTIVITY="app/getActivity";
export const APP_CHANGE_VIEW_SITE="app/changeViewSite";
export const APP_DELETE_ACOUNT="app/deleteAcount";
export const APP_CHECK_PASS="app/checkPass";
export const APP_CHECK_DEVICE="app/checkDevice";
export const APP_SAVE_LANGUAGE= "app/saveLanguage";
export const APP_LIST_COURSE= "app/listCourse";
export const APP_LIST_COURSE1= "app/listCourse1";




export const APP_COURSES  = 'app/courses';
export const APP_INFOR_TEACHER  = 'app/inforTeacher';
export const APP_TRIAL_LESSONS  = 'app/trialLessons';
export const APP_LOGIN_V2 = 'app/loginV2';
export const APP_REFRESH  = 'app/refresh';
export const APP_INFOR_USER  = 'app/inforUser';
export const APP_COURSES_ME = 'app/courseMe';
export const APP_LIST_LESSONS = 'app/listLesson';
export const APP_LESSONS_ID = 'app/lessonsID';
export const APP_CATEGORIES= 'app/categories';




export const APP_All_CALENDAR = "app/allCalendar";
export const APP_DELETE_LEAVE_CALENDAR = "app/deleteLeaveCalendar";
export const APP_LEAVE_CALENDAR = "app/leaveCalendar";
export const APP_CALENDAR_CHECKIN = "app/calendarCheckin";
export const APP_ACCEPT_CALENDAR = "app/acceptCalendar";
export const APP_SELECT_CALENDAR = "app/selectCalendar";
export const APP_LIST_SCHEDULE_EVENTS = "app/listScheduleEvents";

export const APP_COMBO_QUIZ_TEST = "app/comboQuizTest";
export const APP_LIST_QUIZ_TEST = "app/listQuizTest";
export const APP_STUDENT_MAP_COMBO = "app/studentMapCombo";

