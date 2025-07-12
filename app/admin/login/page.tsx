"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button, Input, Card, CardBody, CardHeader } from "@heroui/react";

const AdminLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Загрузка сохраненных данных из localStorage при монтировании компонента
  useEffect(() => {
    const savedEmail = localStorage.getItem("adminEmail");
    const savedPassword = localStorage.getItem("adminPassword");

    if (savedEmail) {
      setEmail(savedEmail);
    }

    if (savedPassword) {
      setPassword(savedPassword);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Формируем payload в соответствии с требуемым форматом
      const payload = {
        data: {
          email,
          password,
          submit: true,
        },
        metadata: {
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          offset: new Date().getTimezoneOffset() * -1,
          origin: window.location.origin,
          referrer: document.referrer,
          browserName: navigator.appName,
          userAgent: navigator.userAgent,
          pathName: window.location.pathname,
          onLine: navigator.onLine,
        },
        state: "submitted",
      };

      // Выполняем запрос к API formio для авторизации
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_FORMIO_BASE_URL}admin/login/submission`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      // Получаем токен из заголовка ответа
      const token = response.headers.get("x-jwt-token");

      if (!token) {
        // Если токен не получен, пытаемся получить сообщение об ошибке из ответа
        const data = await response.json();
        throw new Error(data.message || "Ошибка авторизации: токен не получен");
      }

      // Сохраняем данные авторизации в localStorage
      localStorage.setItem("adminEmail", email);
      localStorage.setItem("adminPassword", password);
      localStorage.setItem("formioToken", token);

      // Сразу перенаправляем на страницу админ-панели
      router.push("/admin");
    } catch (err: any) {
      setError(err.message || "Произошла ошибка при авторизации");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-[64px] px-4 flex justify-center items-center min-h-[calc(100vh-64px)]">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-col gap-2 items-center">
          <h1 className="text-2xl font-bold">Вход в админ-панель</h1>
          <p className="text-gray-500">
            Пожалуйста, авторизуйтесь для доступа к админ-панели
          </p>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            {error && (
              <div className="bg-red-100 text-red-700 p-3 rounded-md">
                {error}
              </div>
            )}
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Введите ваш email"
              required
              fullWidth
            />
            <Input
              label="Пароль"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Введите ваш пароль"
              required
              fullWidth
            />
            <Button
              type="submit"
              color="primary"
              isLoading={isLoading}
              fullWidth
            >
              Войти
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default AdminLoginPage;
