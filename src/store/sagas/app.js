import {takeLatest, all, put, take} from 'redux-saga/effects';
import {
  GET_LOCATION,
  APP_LIST_ITEM,
  APP_SOURSE_DETAIL,
  APP_TREND_SEARCH,
  APP_SEARCH_COURSE,
  APP_LIST_MY_COURSE,
  APP_DISCUSSIONS_NOTE,
  APP_LEARN,
  APP_LIST_SOURCE_CATEGORY,
  APP_ADD_DISCUSSIONS,
  APP_ADD_NOTE,
  APP_SOURSE_DISCUSSION,
  APP_DOWNLOAD_FILE,
  APP_RATING_COURSE,
  APP_DETAIL_COMBO,
  APP_UPDATE_PROFILE,
  APP_NOTIFICATION,
  APP_READ_NOTI,
  APP_DETAIL_COURSE,
  APP_ACTIVE_COURSE,
  APP_DETAIL_COMBO_COURSE,
  APP_TYPE_PAYMENT,
  APP_COMPLETE_LESSON,
  APP_CHECK_CLOSE_LESSON,
  APP_UPLOAD_AVATAR,
  APP_COURSE_DONE,
  APP_RIGISTER_FACEBOOK,
  APP_GET_INFO,
  APP_GET_PUBLIC_QUIZES,
  APP_GET_QUIZ_DETAIL,
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
  APP_USERS_ME,
  APP_SEARCH_COURSE_ME,
  APP_COURSES_DETAIL,
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

} from '../actions/types';
import app from '../api/app';

import {saveInfoUser} from '../actions/auth';

import {saveListItem, saveListSourceCategory} from 'actions/app';
import {createRequestSaga} from './common';

const requestGetLocation = createRequestSaga({
  request: app.getLocation, // request được gọi trong file api/auth.js đã được defined
  key: 'getLocation',

  //  Request thành công or lỗi, 2 funtion nay chỉ có thể dispath đc action
  success: [],
  failure: [],

  //  Request thành công or lỗi, 2 funtion nay chỉ có thể thực thiện function không dispath đc action
  functionSuccess: [
    // () => todoSomething(err)
  ],
  functionFailure: [
    // () => funcHandleErr(err)
  ],
});
const requestSelectCalendar = createRequestSaga({
  request: app.selectCalendar,
  key: 'selectCalendar',
  success: [],
  failure: [],
  functionSuccess: [],
  functionFailure: [],
});

const requestListScheduleEvents = createRequestSaga({
  request: app.listScheduleEvents,
  key: 'listScheduleEvents',
  success: [],
  failure: [],
  functionSuccess: [],
  functionFailure: [],
});



const requestAcceptCalendar = createRequestSaga({
  request: app.acceptCalendar,
  key: 'acceptCalendar',
  success: [],
  failure: [],
  functionSuccess: [],
  functionFailure: [],
});
const requestCalendarCheckin = createRequestSaga({
  request: app.calendarCheckin,
  key: 'calendarCheckin',
  success: [],
  failure: [],
  functionSuccess: [],
  functionFailure: [],
});
const requestListItem = createRequestSaga({
  request: app.listItem,
  key: 'listItem',
  success: [],
  failure: [],
  functionSuccess: [],
  functionFailure: [],
});

const requestBlogs = createRequestSaga({
  request: app.blogs,
  key: 'blogs',
  success: [],
  failure: [],
  functionSuccess: [],
  functionFailure: [],
});
const requestBlog = createRequestSaga({
  request: app.blog,
  key: 'blog',
  success: [],
  failure: [],
  functionSuccess: [],
  functionFailure: [],
});
const requestDocuments = createRequestSaga({
  request: app.documents,
  key: 'documents',
  success: [],
  failure: [],
  functionSuccess: [],
  functionFailure: [],
});

const requestDocument = createRequestSaga({
  request: app.document,
  key: 'document',
  success: [],
  failure: [],
  functionSuccess: [],
  functionFailure: [],
});

const requestSourceDetail = createRequestSaga({
  request: app.sourseDetail,
  key: 'sourseDetail',
  success: [],
  failure: [],
  functionSuccess: [],
  functionFailure: [],
});
const requestTrendSearch = createRequestSaga({
  request: app.trendsearch,
  key: 'trendsearch',
  success: [],
  failure: [],
  functionSuccess: [],
  functionFailure: [],
});
const requestSearchSourse = createRequestSaga({
  request: app.searchcourse,
  key: 'searchcourse',
  success: [],
  failure: [],
  functionSuccess: [],
  functionFailure: [],
});
const requestListMyCourse = createRequestSaga({
  request: app.listmycourse,
  key: 'listmycourse',
  success: [],
  failure: [],
  functionSuccess: [],
  functionFailure: [],
});
const requestDiscussionsNote = createRequestSaga({
  request: app.discussionsNote,
  key: 'discussionsNote',
  success: [],
  failure: [],
  functionSuccess: [],
  functionFailure: [],
});
const requestLearn = createRequestSaga({
  request: app.learn,
  key: 'learn',
  success: [],
  failure: [],
  functionSuccess: [],
  functionFailure: [],
});
const requestListSourceCategory = createRequestSaga({
  request: app.listSourceCategory,
  key: 'listSourceCategory',
  success: [
    // (res) => saveListSourceCategory(res),
  ],
  failure: [],
  functionSuccess: [],
  functionFailure: [],
});
const requestAddDiscusions = createRequestSaga({
  request: app.addDiscussions,
  key: 'addDiscussions',
  success: [],
  failure: [],
  functionSuccess: [],
  functionFailure: [],
});
const requestAddNote = createRequestSaga({
  request: app.addNote,
  key: 'addNote',
  success: [],
  failure: [],
  functionSuccess: [],
  functionFailure: [],
});
const requestSourseDiscussion = createRequestSaga({
  request: app.course_discussion,
  key: 'course_discussion',
  success: [],
  failure: [],
  functionSuccess: [],
  functionFailure: [],
});
const requestDownloadFile = createRequestSaga({
  request: app.downloadfile,
  key: 'downloadfile',
  success: [],
  failure: [],
  functionSuccess: [],
  functionFailure: [],
});
const requestRatingCourse = createRequestSaga({
  request: app.ratingCourse,
  key: 'ratingCourse',
  success: [],
  failure: [],
  functionSuccess: [],
  functionFailure: [],
});

const requestDetailCombo = createRequestSaga({
  request: app.detailCombo,
  key: 'detailCombo',
  success: [],
  failure: [],
  functionSuccess: [],
  functionFailure: [],
});
const requestDetailCourse = createRequestSaga({
  request: app.detailCourse,
  key: 'detailCourse',
  success: [],
  failure: [],
  functionSuccess: [],
  functionFailure: [],
});
const requestUpdateProfile = createRequestSaga({
  request: app.updateProfile,
  key: 'updateProfile',
  success: [],
  failure: [],
  functionSuccess: [],
  functionFailure: [],
});

const requestNotification = createRequestSaga({
  request: app.notification,
  key: 'notification',
  success: [],
  failure: [],
  functionSuccess: [],
  functionFailure: [],
});
const requestActiveCourse = createRequestSaga({
  request: app.activeCourse,
  key: 'activeCourse',
  success: [],
  failure: [],
  functionSuccess: [],
  functionFailure: [],
});
const requestDetailComboCourse = createRequestSaga({
  request: app.detailComboCourse,
  key: 'detailComboCourse',
  success: [],
  failure: [],
  functionSuccess: [],
  functionFailure: [],
});

const requestCompleteLesson = createRequestSaga({
  request: app.completeLesson,
  key: 'completeLesson',
  success: [],
  failure: [],
  functionSuccess: [],
  functionFailure: [],
});
const requestCheckCloseLesson = createRequestSaga({
  request: app.checkCloseLesson,
  key: 'checkCloseLesson',
  success: [],
  failure: [],
  functionSuccess: [],
  functionFailure: [],
});
const requestUploadAvatar = createRequestSaga({
  request: app.uploadAvatar,
  key: 'uploadAvatar',
  success: [],
  failure: [],
  functionSuccess: [],
  functionFailure: [],
});
const requestCourseDone = createRequestSaga({
  request: app.courseDone,
  key: 'courseDone',
  success: [],
  failure: [],
  functionSuccess: [],
  functionFailure: [],
});
const requestRegisterFacebook = createRequestSaga({
  request: app.registerFacebook,
  key: 'registerFacebook',
  success: [],
  failure: [],
  functionSuccess: [],
  functionFailure: [],
});
const requestGetAppInfo = createRequestSaga({
  request: app.getAppInfo,
  key: 'getAppInfo',
  success: [],
  failure: [],
  functionSuccess: [],
  functionFailure: [],
});
const requestGetPublicQuizes = createRequestSaga({
  request: app.getPublicQuizes,
  key: 'getPublicQuizes',
  success: [],
  failure: [],
  functionSuccess: [],
  functionFailure: [],
});
const requestGetQuizDetail = createRequestSaga({
  request: app.getQuizDetail,
  key: 'getQuizDetail',
  success: [],
  failure: [],
  functionSuccess: [],
  functionFailure: [],
});
const requestGetListCategory = createRequestSaga({
  request: app.getListCategory,
  key: 'getListCategory',
  success: [],
  failure: [],
  functionSuccess: [],
  functionFailure: [],
});

const requestGetQuizQuestions = createRequestSaga({
  request: app.getQuizQuestions,
  key: 'getQuizQuestions',
  success: [],
  failure: [],
  functionSuccess: [],
  functionFailure: [],
});
const requestSubmitQuiz = createRequestSaga({
  request: app.submitQuiz,
  key: 'submitQuiz',
  success: [],
  failure: [],
  functionSuccess: [],
  functionFailure: [],
});
const requestGetResultDetail = createRequestSaga({
  request: app.getResultDetail,
  key: 'getResultDetail',
  success: [],
  failure: [],
  functionSuccess: [],
  functionFailure: [],
});
const requestGetActivity = createRequestSaga({
  request: app.getActivity,
  key: 'getActivity',
  success: [],
  failure: [],
  functionSuccess: [],
  functionFailure: [],
});
const requestChangeViewSite = createRequestSaga({
  request: app.changeViewSite,
  key: 'changeViewSite',
  success: [],
  failure: [],
  functionSuccess: [],
  functionFailure: [],
});
const requestDeleteAcount = createRequestSaga({
  request: app.deleteAcount,
  key: 'deleteAcount',
  success: [],
  failure: [],
  functionSuccess: [],
  functionFailure: [],
});
const requestCheckPass = createRequestSaga({
  request: app.checkPass,
  key: 'checkPass',
  success: [],
  failure: [],
  functionSuccess: [],
  functionFailure: [],
});
const requestCheckDevice = createRequestSaga({
  request: app.checkDevice,
  key: 'checkDevice',
  success: [],
  failure: [],
  functionSuccess: [],
  functionFailure: [],
});
const requestListCourse = createRequestSaga({
  request: app.listCourse,
  key: 'listCourse',
  success: [],
  failure: [],
  functionSuccess: [],
  functionFailure: [],
});
const requestListCourse1 = createRequestSaga({
  request: app.listCourse1,
  key: 'listCourse1',
  success: [],
  failure: [],
  functionSuccess: [],
  functionFailure: [],
});

const requestSearchBlogs = createRequestSaga({
  request: app.searchBlogs,
  key: 'searchBlogs',
  success: [],
  failure: [],
  functionSuccess: [],
  functionFailure: [],
});
const requestSearchDocuments = createRequestSaga({
  request: app.searchDocuments,
  key: 'searchDocuments',
  success: [],
  failure: [],
  functionSuccess: [],
  functionFailure: [],
});
const requestCourses = createRequestSaga({
  request: app.courses,
  key: 'courses',
  success: [],
  failure: [],
  functionSuccess: [],
  functionFailure: [],
});

const requestInforTeacher = createRequestSaga({
  request: app.inforTeacher,
  key: 'inforTeacher',
  success: [],
  failure: [],
  functionSuccess: [],
  functionFailure: [],
});
const requestTrialLessons = createRequestSaga({
  request: app.trialLessons,
  key: 'trialLessons',
  success: [],
  failure: [],
  functionSuccess: [],
  functionFailure: [],
});

const requestRefresh = createRequestSaga({
  request: app.refresh,
  key: 'refresh',
  success: [],
  failure: [],
  functionSuccess: [],
  functionFailure: [],
});
const requestInforUser = createRequestSaga({
  request: app.inforUser,
  key: 'inforUser',
  success: [res => saveInfoUser(res)],
  failure: [],
  functionSuccess: [],
  functionFailure: [],
});
const requestCoursesMe = createRequestSaga({
  request: app.courseMe,
  key: 'courseMe',
  success: [],
  failure: [],
  functionSuccess: [],
  functionFailure: [],
});
const requestListLessons = createRequestSaga({
  request: app.listLesson,
  key: 'listLesson',
  success: [],
  failure: [],
  functionSuccess: [],
  functionFailure: [],
});
const requestLessonsId = createRequestSaga({
  request: app.lessonsID,
  key: 'lessonsID',
  success: [],
  failure: [],
  functionSuccess: [],
  functionFailure: [],
});
const requestCategories = createRequestSaga({
  request: app.categories,
  key: 'categories',
  success: [],
  failure: [],
  functionSuccess: [],
  functionFailure: [],
});
const requestSearchCourseMe = createRequestSaga({
  request: app.searchCourseMe,
  key: 'searchCourseMe',
  success: [],
  failure: [],
  functionSuccess: [],
  functionFailure: [],
});
const requestCoursesDetail = createRequestSaga({
  request: app.coursesDetail,
  key: 'courseDetail',
  success: [],
  failure: [],
  functionSuccess: [],
  functionFailure: [],
});
const requestUsersMe = createRequestSaga({
  request: app.usersMe,
  key: 'usersMe',
  success: [],
  failure: [],
  functionSuccess: [],
  functionFailure: [],
});
const requestSaveReceipt = createRequestSaga({
  request: app.saveReceipt,
  key: 'saveReceipt',
  success: [],
  failure: [],
  functionSuccess: [],
  functionFailure: [],
});

const requestAllCalendar = createRequestSaga({
  request: app.allCalendar,
  key: 'allCalendar',
  success: [],
  failure: [],
  functionSuccess: [],
  functionFailure: [],
});
const requestDeleteLeaveCalendar = createRequestSaga({
  request: app.deleteLeaveCalendar,
  key: 'deleteLeaveCalendar',
  success: [],
  failure: [],
  functionSuccess: [],
  functionFailure: [],
});
const requestLeaveCalendar = createRequestSaga({
  request: app.leaveCalendar,
  key: 'leaveCalendar',
  success: [],
  failure: [],
  functionSuccess: [],
  functionFailure: [],
});
const requestComboQuizTest = createRequestSaga({
  request: app.comboQuizTest,
  key: 'comboQuizTest',
  success: [],
  failure: [],
  functionSuccess: [],
  functionFailure: [],
});
const requestListQuizTest= createRequestSaga({
  request: app.listQuizTest,
  key: 'listQuizTest',
  success: [],
  failure: [],
  functionSuccess: [],
  functionFailure: [],
});
const requestStudentMapCombo = createRequestSaga({
  request: app.studentMapCombo,
  key: 'studentMapCombo',
  success: [],
  failure: [],
  functionSuccess: [],
  functionFailure: [],
});
const requestReadNoti = createRequestSaga({
  request: app.readnoti,
  key: 'readnoti',
  success: [],
  failure: [],
  functionSuccess: [],
  functionFailure: [],
});
// root saga reducer
export default [
  function* fetchWatcher() {
    yield all([
      takeLatest(APP_All_CALENDAR, requestAllCalendar),
      takeLatest(APP_DELETE_LEAVE_CALENDAR, requestDeleteLeaveCalendar),
      takeLatest(APP_LEAVE_CALENDAR, requestLeaveCalendar),
      takeLatest(APP_CALENDAR_CHECKIN, requestCalendarCheckin),
      takeLatest(APP_ACCEPT_CALENDAR, requestAcceptCalendar),
      takeLatest(APP_SELECT_CALENDAR, requestSelectCalendar),
      takeLatest(APP_LIST_SCHEDULE_EVENTS, requestListScheduleEvents ),


      takeLatest(GET_LOCATION, requestGetLocation),
      takeLatest(APP_BLOGS, requestBlogs),
      takeLatest(APP_DETAIL_BLOG, requestBlog),
      takeLatest(APP_DOCUMENTS, requestDocuments),
      takeLatest(APP_DETAIL_DOCUMENT, requestDocuments),
      takeLatest(APP_LIST_ITEM, requestListItem),
      takeLatest(APP_SOURSE_DETAIL, requestSourceDetail),
      takeLatest(APP_TREND_SEARCH, requestTrendSearch),
      takeLatest(APP_SEARCH_COURSE, requestSearchSourse),
      takeLatest(APP_LIST_MY_COURSE, requestListMyCourse),
      takeLatest(APP_DISCUSSIONS_NOTE, requestDiscussionsNote),
      takeLatest(APP_LEARN, requestLearn),
      takeLatest(APP_LIST_SOURCE_CATEGORY, requestListSourceCategory),
      takeLatest(APP_ADD_DISCUSSIONS, requestAddDiscusions),
      takeLatest(APP_ADD_NOTE, requestAddNote),
      takeLatest(APP_SOURSE_DISCUSSION, requestSourseDiscussion),
      takeLatest(APP_DOWNLOAD_FILE, requestDownloadFile),
      takeLatest(APP_RATING_COURSE, requestRatingCourse),
      takeLatest(APP_CHECK_PASS, requestCheckPass),
      takeLatest(APP_DETAIL_COMBO, requestDetailCombo),
      takeLatest(APP_ACTIVE_COURSE, requestActiveCourse),
      takeLatest(APP_DETAIL_COURSE, requestDetailCourse),
      takeLatest(APP_UPDATE_PROFILE, requestUpdateProfile),
      takeLatest(APP_NOTIFICATION, requestNotification),
      takeLatest(APP_READ_NOTI, requestReadNoti),

      takeLatest(APP_DETAIL_COMBO_COURSE, requestDetailComboCourse),
      takeLatest(APP_COMPLETE_LESSON, requestCompleteLesson),
      takeLatest(APP_CHECK_CLOSE_LESSON, requestCheckCloseLesson),
      takeLatest(APP_UPLOAD_AVATAR, requestUploadAvatar),
      takeLatest(APP_COURSE_DONE, requestCourseDone),
      takeLatest(APP_RIGISTER_FACEBOOK, requestRegisterFacebook),
      takeLatest(APP_GET_INFO, requestGetAppInfo),
      takeLatest(APP_GET_PUBLIC_QUIZES, requestGetPublicQuizes),
      takeLatest(APP_GET_QUIZ_DETAIL, requestGetQuizDetail),
      takeLatest(APP_GET_LIST_CATEGORY, requestGetListCategory),
      takeLatest(APP_GET_QUIZ_QUESTIONS, requestGetQuizQuestions),
      takeLatest(APP_SUBMIT_QUIZ, requestSubmitQuiz),
      takeLatest(APP_GET_RESULT_DETAIL, requestGetResultDetail),
      takeLatest(APP_GET_ACTIVITY, requestGetActivity),
      takeLatest(APP_CHANGE_VIEW_SITE, requestChangeViewSite),
      takeLatest(APP_DELETE_ACOUNT, requestDeleteAcount),
      takeLatest(APP_CHECK_DEVICE, requestCheckDevice),
      takeLatest(APP_LIST_COURSE, requestListCourse),
      takeLatest(APP_LIST_COURSE1, requestListCourse1),
      takeLatest(APP_SEARCH_BLOGS, requestSearchBlogs),
      takeLatest(APP_SEARCH_COURSE_ME, requestSearchCourseMe),
      takeLatest(APP_SEARCH_DOCUMENTS, requestSearchDocuments),
      takeLatest(APP_COURSES, requestCourses),
      takeLatest(APP_INFOR_TEACHER, requestInforTeacher),
      takeLatest(APP_TRIAL_LESSONS, requestTrialLessons),
      takeLatest(APP_REFRESH, requestRefresh),
      takeLatest(APP_INFOR_USER, requestInforUser),
      takeLatest(APP_COURSES_ME, requestCoursesMe),
      takeLatest(APP_LIST_LESSONS, requestListLessons),
      takeLatest(APP_LESSONS_ID, requestLessonsId),
      takeLatest(APP_CATEGORIES, requestCategories),
      takeLatest(APP_USERS_ME, requestUsersMe),
      takeLatest(APP_COURSES_DETAIL, requestCoursesDetail),

      takeLatest(APP_SAVE_RECEIPT, requestSaveReceipt),
     
      takeLatest(APP_COMBO_QUIZ_TEST, requestComboQuizTest),
      takeLatest(APP_LIST_QUIZ_TEST, requestListQuizTest),
      takeLatest(APP_STUDENT_MAP_COMBO, requestStudentMapCombo),

      
    ]);
  },
];
