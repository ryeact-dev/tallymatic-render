import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const headerStore = create((set) => ({
  pageTitle: 'Home',
  setPageTitle: ({ title }) => set(() => ({ pageTitle: title })),
}));

export const modalStore = create((set) => ({
  isOpen: false,
  title: '',
  bodyType: '',
  extraObject: {},
  size: 'max-w-md',

  openModal: ({ title, bodyType, extraObject, size }) =>
    set(() => ({
      isOpen: true,
      bodyType: bodyType,
      title: title,
      extraObject: extraObject,
      size: size || 'max-w-md',
    })),
  closeModal: () =>
    set(() => ({
      isOpen: false,
      bodyType: '',
      title: '',
      extraObject: {},
    })),
}));

export const competitionStore = create((set) => ({
  competitions: [],
  setCompetitions: ({ competitions }) => set(() => ({ competitions })),
}));

export const currentUserStore = create(
  // persist(
  (set) => ({
    currentUser: null,
    setCurrentUser: ({
      userId,
      isLock,
      fullName,
      judgeNumber,
      role,
      listOfCompetitions,
      eventName,
      eventId,
    }) =>
      set(() => ({
        currentUser: {
          userId,
          isLock,
          fullName,
          judgeNumber,
          role,
          listOfCompetitions,
          eventName,
          eventId,
        },
      })),
  })
  //   {
  //     name: 'tallymatic__user', // name of the item in the storage (must be unique)
  //     storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
  //   }
  // )
);
