import {API, API_HUECHIAKI, token, site_id} from './common';

// create request => dispath to saga
export default {
  deleteAcount: idUser =>
    API.post(`id/delete/${idUser}`, {}, {headers: {Authorization: token}}),

  sourseDetail: (code, idUser) =>
    API_HUECHIAKI.get(
      `courses/incourse/${code}/${idUser}`,
      {},
      {headers: {Authorization: token}},
    ),

  listCourse: limit =>
    API.get(
      `courses/list-course?limit=${limit}`,
      {},
      {headers: {Authorization: token}},
    ),
  listCourse1: () =>
    API_HUECHIAKI.get(
      `courses?site_id=${site_id}`,
      {},
      {headers: {'Accept-Language': 'vi'}},
    ),

  saveReceipt: (params = {}, token) =>
    API_HUECHIAKI.post(`ipa/save-receipt`, params, {
      headers: {
        'Accept-Language': 'vi',
        Authorization: `Bearer ${token}`,
      },
    }),

  refresh: (params = {}) =>
    API_HUECHIAKI.post('auth/refresh', params, {
      headers: {
        'Accept-Language': 'vi',
        'Content-Type': 'application/json',
      },
    }),

  inforUser: token =>
    API_HUECHIAKI.get(
      'users/me',
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    ),

  comboQuizTest: token =>
    API_HUECHIAKI.get(
      'combos/quiz-test',
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    ),

  listQuizTest: (combo_id, user_id, token) =>
    API_HUECHIAKI.get(
      `quiz-test/me?filters[combo_id]=${combo_id}&filters[user_id]=${user_id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    ),
  studentMapCombo: (params = {}, token) =>
    API_HUECHIAKI.post(`/student-map-combo/check-attach-combo`, params, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

  lessonsID: (type, token, id, params = {}) => {
    switch (type) {
      case 'get':
        return API_HUECHIAKI.get(
          `lessons/${id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
      case 'patch':
        return API_HUECHIAKI.patch(`lessons/${id}`, params, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

      default:
        break;
    }
  },

  allCalendar: (start_time, end_time, token) =>
    API_HUECHIAKI.get(
      `calendar-student?filters[start_time]=${start_time}&filters[end_time]=${end_time}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
          // 'Accept-Language': 'vi',
          // 'Content-Type': 'application/json',
        },
      },
    ),
  selectCalendar: (user_schedule_id, token) =>
    API_HUECHIAKI.get(
      `calendar-student/${user_schedule_id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      },
    ),
  deleteLeaveCalendar: (user_schedule_event_id, token) =>
    API_HUECHIAKI.delete(
      `calendar-student/leave/${user_schedule_event_id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    ),
  listScheduleEvents: (day, schedule_id, user_schedule_id, token) =>
    API_HUECHIAKI.get(
      `calendar-student/user-schedule-events?filters[day]=${day}&filters[schedule_id]=${schedule_id}&filters[user_schedule_id]=${user_schedule_id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    ),
  leaveCalendar: (params = {}, token) =>
    API_HUECHIAKI.post(`calendar-student/leave`, params, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  calendarCheckin: (params = {}, token) =>
    API_HUECHIAKI.post(`calendar-student/checkin`, params, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  acceptCalendar: (params = {}, token) =>
    API_HUECHIAKI.post(`calendar-student/accept`, params, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

  listLesson: (id, token) =>
    API_HUECHIAKI.get(
      `/courses/${id}/lessons`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          accept: 'application/json',
          'Accept-Language': 'vi',
        },
      },
    ),
  courseMe: (page, token) =>
    API_HUECHIAKI.get(
      `courses/me?page=${page}&limit=100`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          accept: 'application/json',
          'Accept-Language': 'vi',
        },
      },
    ),
  coursesDetail: (id_course, token) =>
    API_HUECHIAKI.get(
      `courses/${id_course}`,
      {},
      {
        headers: {
          // accept: `application/json`,
          Authorization: `Bearer ${token} `,
        },
      },
    ),
  usersMe: accessToken =>
    API_HUECHIAKI.get(
      `users/me`,
      {},
      {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    ),

  checkPass: (idUser, lessonId) =>
    API.post(
      `lesson/check-pass/${idUser}/${lessonId}`,
      {},
      {
        headers: {Authorization: token},
      },
    ),

  // checkDevice ĐIỀN VÀO ĐAY
  checkDevice: (idUser, appId, params = {}) =>
    API.get(`id/check-app/${idUser}/${appId}`, params, {
      headers: {Authorization: token},
    }),
  courseDone: (params = {}) =>
    API.post(`courses/get-complete-course`, params, {
      headers: {Authorization: token},
    }),

  trendsearch: (params = {}) => API.post(`trendsearch`, params),

  searchcourse: (type, key, name) => {
    switch (type) {
      case 'searchCategory':
        return API_HUECHIAKI.get(
          `courses?page=1&limit=40&site_id=${site_id}&category_id=${key}`,

          {},
          {
            headers: {
              // Authorization: `Bearer ${token}`,
            },
          },
        );

      case 'searchTitle':
        return API_HUECHIAKI.get(
          `courses?page=1&limit=40&site_id=${site_id}&name=${key}`,

          {},
          {
            headers: {
              'Accept-Language': 'vi',
              accept: 'application/json',
            },
          },
        );

      case 'searchAll':
        return API_HUECHIAKI.get(
          `courses?page=1&limit=40&site_id=${site_id}&category_id=${key}&name=${name}`,
          {},
          {
            headers: {
              // Authorization: `Bearer ${token}`,
            },
          },
        );

      default:
        break;
    }
  },

  checkCloseLesson: (params = {}) =>
    API.post(`courses/check-close-lesson`, params, {
      headers: {Authorization: token},
    }),

  uploadAvatar: (idUser, params = {}) =>
    API.post(`id/upload-avatar/${idUser}`, params, {
      headers: {Authorization: token},
    }),

  listmycourse: (idUser, lang) =>
    API.get(
      `courses/my-courses/${idUser}?lang=${lang}`,
      {},
      {headers: {Authorization: token}},
    ),

  blogs: () =>
    API_HUECHIAKI.get(
      `blogs?page=1&limit=100&site_id=${site_id}`,
      {},
      {headers: {}},
    ),
  searchBlogs: (type, key, categories) => {
    switch (type) {
      case 'searchTitle':
        return API_HUECHIAKI.get(
          `blogs?page=1&limit=100&site_id=${site_id}&search=${key}`,
          {},
          {headers: {}},
        );
      case 'searchCategory':
        return API_HUECHIAKI.get(
          `blogs?page=1&limit=100&site_id=${site_id}&category_id=${key}`,
          {},
          {headers: {}},
        );
      case 'searchAll':
        return API_HUECHIAKI.get(
          `blogs?page=1&limit=100&site_id=${site_id}&search=${key}&category_id=${categories}`,
          {},
          {headers: {}},
        );
      default:
        break;
    }
  },

  searchCourseMe: (type, key, token, name) => {
    switch (type) {
      case 'searchTitle':
        return API_HUECHIAKI.get(
          `courses/me?page=1&limit=100&name=${key}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
              accept: 'application/json',
              'Accept-Language': 'vi',
            },
          },
        );
      case 'searchCategory':
        return API_HUECHIAKI.get(
          `courses/me?page=1&limit=100&category_id=${key}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
              accept: 'application/json',
              'Accept-Language': 'vi',
            },
          },
        );
      case 'searchAll':
        return API_HUECHIAKI.get(
          `courses/me?page=1&limit=100&category_id=${key}&name=${name}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
              accept: 'application/json',
              'Accept-Language': 'vi',
            },
          },
        );
      case 'noSearch':
        return API_HUECHIAKI.get(
          `courses/me?ids[]=${key}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
              accept: 'application/json',
              'Accept-Language': 'vi',
            },
          },
        );

      case 'attachment':
        return API_HUECHIAKI.post(
          `courses/${key}/attachment`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
              accept: 'application/json',
              'Accept-Language': 'vi',
            },
          },
        );
      default:
        break;
    }
  },

  blog: id_blogs => API_HUECHIAKI.get(`blogs/${id_blogs}`, {}, {headers: {}}),

  documents: (type, id, title) => {
    switch (type) {
      case 'documents':
        return API_HUECHIAKI.get(
          `documents?page=1&limit=100&site_id=${site_id}`,
          {},
          {headers: {}},
        );
      case 'docCategori':
        return API_HUECHIAKI.get(
          `documents?page=1&limit=100&category_id=${id}&site_id=${site_id}`,
          {},
          {headers: {}},
        );
      case 'text&Id':
        return API_HUECHIAKI.get(
          `documents?page=1&limit=100&category_id=${id}&site_id=${site_id}&title=${title}`,
          {},
          {headers: {}},
        );
      case 'value':
        return API_HUECHIAKI.get(
          `documents?page=1&limit=100&site_id=${site_id}&title=${id}`,
          {},
          {headers: {}},
        );
      case 'documentsID':
        return API_HUECHIAKI.get(`documents/${id}`, {}, {headers: {}});

      default:
        break;
    }
  },

  searchDocuments: key =>
    API.get(`documents?title=${key}`, {}, {headers: {Authorization: token}}),

  document: id_documents =>
    API.get(`document/${id_documents}`, {}, {headers: {Authorization: token}}),

  discussionsNote: (params = {}) => API.post(`discussionsnote`, params),

  learn: (params = {}) => API.post(`learn`, params),

  listSourceCategory: () =>
    API.get(`category/list-category`, {}, {headers: {Authorization: token}}),

  addDiscussions: (params = {}) => API.post(`adddiscussion`, params),

  addNote: (params = {}) => API.post(`addnote`, params),

  course_discussion: (params = {}) => API.post(`course_discussion`, params),

  downloadfile: (params = {}) => API.post(`downloadfile`, params),

  ratingCourse: (params = {}) => API.post(`ratingcourse`, params),

  detailCombo: (params = {}) => API.post(`detailcombo`, params),

  activeCourse: (params = {}) =>
    API.post(`courses/join-room`, params, {headers: {Authorization: token}}),

  detailCourse: code =>
    API.get(`courses/get/${code}`, {}, {headers: {Authorization: token}}),

  completeLesson: params =>
    API.post(`courses/complete-lesson`, params, {
      headers: {Authorization: token},
    }),

  // courses: () =>
  // API_HUECHIAKI.get(
  //     `courses?page=1&limit=10&site_id=${site_id}`,
  //     {},
  //     {
  //       headers: {
  //         // Authorization: `Bearer ${token}`,
  //       },
  //     },
  //   ),
  courses: (type, id, token) => {
    switch (type) {
      case 'courses':
        return API_HUECHIAKI.get(
          `courses?page=1&limit=40&site_id=${site_id}&status=1`,
          // `courses?page=1&limit=40&site_id=${site_id}`,
          {},
          {
            headers: {
              // Authorization: `Bearer ${token}`,
            },
          },
        );

      case 'coursesID':
        return API_HUECHIAKI.get(
          `courses/${id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

      default:
        break;
    }
  },
  inforTeacher: id => API_HUECHIAKI.get(`teachers/${id}`, {}),
  trialLessons: id =>
    API_HUECHIAKI.get(
      `courses/${id}/trial-lessons`,
      {},
      {
        headers: {
          // Authorization: `Bearer ${token}`,
          accept: 'application/json',
        },
      },
    ),
  categories: type =>
    API_HUECHIAKI.get(
      `categories?page=1&limit=10&site_id=${site_id}`,
      {},
      {
        headers: {
          // Authorization: `Bearer ${token}`,
          accept: 'application/json',
        },
      },
    ),

  updateProfile: (idUser, params = {}, token) =>
    API_HUECHIAKI.put(`students/${idUser}`, params, {
      headers: {Authorization: `Bearer ${token}`},
    }),

  registerFacebook: (params = {}) =>
    API.post(`id/register-facebook`, params, {headers: {Authorization: token}}),

  notification: token =>
    API_HUECHIAKI.get(
      `notification?page=1&limit=100&sort[created_at]=-1`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    ),
  readnoti: (id, token) =>
    API_HUECHIAKI.get(
      `notification/read-status/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    ),
  listItem: (params = {}, type) => {
    switch (type) {
      case 'promotion_course':
        return API.post(`promotioncourses`, params);
      case 'new_course':
        return API.post(`newcourses`, params);
      case 'hot_course':
        return API.post(`hotcourses`, params);
      case 'favorite_course':
        return API.post(`favoritecourse`, params);
      default:
        break;
    }
  },

  detailComboCourse: (code, idUser) =>
    API.get(
      `courses/detail-combo-course/${code}?user_id=${idUser}`,
      {},
      {headers: {Authorization: token}},
    ),
  getAppInfo: () =>
    API.get(`id/version-and-show`, {}, {headers: {Authorization: token}}),
  getPublicQuizes: (params = {}) =>
    API.post(`v1/quiz/list`, params, {headers: {Authorization: token}}),
  getQuizDetail: (user_id, quiz_id) =>
    API.get(
      `v1/quiz/detail/${user_id}/${quiz_id}`,
      {},
      {headers: {Authorization: token}},
    ),
  getListCategory: () =>
    API.get(`v1/quiz/category`, {}, {headers: {Authorization: token}}),

  getQuizQuestions: quiz_id =>
    API.get(
      `v1/quiz/questions/${quiz_id}`,
      {},
      {headers: {Authorization: token}},
    ),
  submitQuiz: () => API.get(``, {}, {headers: {Authorization: token}}),
  getResultDetail: () => API.get(``, {}, {headers: {Authorization: token}}),
  getActivity: params =>
    API.post(`v1/quiz/result/list`, params, {headers: {Authorization: token}}),
  changeViewSite: params =>
    API.post(`/id/view-site-mobile`, params, {headers: {Authorization: token}}),
};
