import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface FormioUser {
  _id: string;
  email: string;
  roles: string[];
}

export const useFormioAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<FormioUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      try {
        // Получаем токен из localStorage
        const token = localStorage.getItem("formioToken");

        if (!token) {
          // Если токена нет, перенаправляем на страницу авторизации
          router.push("/admin/login");
          return;
        }

        // Проверяем валидность токена, делая запрос к API formio
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_FORMIO_BASE_URL}current`,
          {
            headers: {
              "x-jwt-token": token,
            },
          }
        );

        if (!response.ok) {
          // Если токен невалидный, удаляем его из localStorage и перенаправляем на страницу авторизации
          localStorage.removeItem("formioToken");
          localStorage.removeItem("formioUser");
          router.push("/admin/login");
          return;
        }

        // Если токен валидный, устанавливаем флаг авторизации
        setIsAuthenticated(true);

        // Пытаемся получить информацию о пользователе из ответа
        try {
          const userData = await response.json();
          setUser(userData);
        } catch (error) {
          // Если не удалось получить данные пользователя, это не критично
          console.warn("Не удалось получить данные пользователя:", error);
          setUser({ _id: "", email: "Администратор", roles: [] });
        }
      } catch (error) {
        console.error("Ошибка при проверке авторизации:", error);
        // В случае ошибки перенаправляем на страницу авторизации
        router.push("/admin/login");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const logout = () => {
    localStorage.removeItem("formioToken");
    localStorage.removeItem("formioUser");
    setIsAuthenticated(false);
    setUser(null);
    router.push("/admin/login");
  };

  return { isAuthenticated, user, isLoading, logout };
};
