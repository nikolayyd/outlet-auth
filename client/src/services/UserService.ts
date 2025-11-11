interface UserData {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
}

const getError = async (res: Response) => {
  const errorText = await res.text();
  throw new Error(errorText);
};

class UserService {
  async getUser(email: string, password: string): Promise<UserData> {
    const params = new URLSearchParams({ email, password });

    const res = await fetch(
      `http://localhost:3000/users/get?${params.toString()}`,
      {
        method: 'GET',
      }
    );

    if (!res.ok) {
      getError(res);
    }

    const data = await res.json();
    return data;
  }
  async createUser(
    email: string,
    firstName: string,
    lastName: string,
    password: string
  ) {
    const res = await fetch(`http://localhost:3000/users/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, firstName, lastName, password }),
    });
    if (!res.ok) {
      getError(res);
    }

    const data: UserData = await res.json();
    return data;
  }
}
export const userService = new UserService();
