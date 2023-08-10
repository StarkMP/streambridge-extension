mv ./dist/popup ./
cd ./packages/content-script
npm run build
mv ../../popup ../../dist