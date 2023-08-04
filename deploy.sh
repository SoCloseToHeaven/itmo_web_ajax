echo "rm -r ~/public_html/lab1/" | ssh helios
echo "mkdir ~/public_html/lab1" | ssh helios
scp -r ./* helios:~/public_html/lab1