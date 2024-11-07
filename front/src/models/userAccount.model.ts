export declare module UserAccount {
  interface ILoginResponse {
    token: string;
    user: {
      id: number;
      email: string;
      pseudo: string;
      first_name: string;
      last_name: string;
      avatar: string;
      role: string;
    };
  }

  interface IUserAccount {
    id: number;
    pseudo: string;
    last_name: string;
    first_name: string;
    email: string;
    avatar: string;
    avg_note: number;
    nb_quiz_make: number;
    total_note: number;
  }

  interface IUserAccountWithRecentActivity extends IUserAccount {
    recent_activity: IRecentActivity[];
  }

  interface IRecentActivity {
    id_quiz: number;
    id_quiz_result: number;
    title: string;
    difficulty: string;
    creation_date: string;
    note: number;
  }
}
