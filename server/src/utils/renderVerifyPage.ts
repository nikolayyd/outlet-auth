export function renderVerifyPage(success: boolean, message: string) {
  const loginUrl = 'http://localhost:5173/sign-in';

  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Email verification</title>
  <style>
    body {
      margin: 0;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #e6e1dc;
      color: #3b2f2a;
      font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
    }
    .card {
      display: flex;
      flex-direction: column;
      gap: 12px;
      max-width: 480px;
      width: 100%;
      background: #dad4cd;
      border-radius: 16px;
      padding: 24px;
      box-shadow: 0 10px 30px rgba(0,0,0,.15);
      text-align: center;
    }
    h1 {
      margin-bottom: 12px;
      font-size: 22px;
    }
    p {
      opacity: .9;
      margin-bottom: 20px;
    }
    a {
      display: inline-block;
      padding: 12px 18px;
      border-radius: 10px;
      text-decoration: none;
      width: fit-content;
      font-weight: 600;
      background: ${success ? '#2ea043' : '#d73a49'};
      color: white;
      align-self: center;
    }
  </style>
</head>
<body>
  <div class="card">
    <h1>${success ? 'Email verified ✅' : 'Verification failed ❌'}</h1>
    <p>${message}</p>
    <a href="${loginUrl}">Go to login page</a>
  </div>
</body>
</html>`;
}
