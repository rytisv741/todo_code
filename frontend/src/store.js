import {create} from 'zustand';

// Define Zustand store for authentication state
const useAuth = create((set) => ({
  user : null,
  loading : false,


  setUser: (user) => set(() => ({ user })),
  setLoading: (loading) => set(() => ({ loading })),
}));


export {
    useAuth
}