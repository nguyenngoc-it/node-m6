### Setup local env

- Install local env
  - Install aws-cli [guide](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
  - Config aws credentials: `aws configure` [guide](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html#cli-configure-files-methods)
  - Clone repo m6-agency-api
  - Tạo file `.env.local` từ file mẫu `.env.example`
  - Run cmd `npm install typescript -g`
  - Run cmd `npm install`
- Start local env
  - Up m6-docker để khởi tạo DB (vì m6-agency-api sẽ connect qua local DB m6)
  - Start env: `npm run dev` (tại bước nhập stage name thì nhập tên mình để không bị trùng với người khác)
  - Remove env: `npm run remove`
