export function printHelp() {
    console.log('Usage:');
    console.log('       cli-mailer <smtps://username:password@smtp.example.com/?pool=true> <sender@email.address.com> <subject> <recipients-path.json> <message-path> ');
    console.log('\nExamples:');
    console.log('       cli-mailer smtps://thomas47:password47@smtp.gmail.com/?pool=true thomas47@gmail.com "Email subject" ./recipients.json ./message.txt')
    console.log('\nContent of "recipients.json":');
    console.log('       ["thomas.johnes@gmail.com", "mark.zuckerberg@facebook.com", "elon.musk@tesla.com"]');
    console.log('\nContent of "message.txt":');
    console.log('       <strong>Hello!</strong></br>');
    console.log('        How are u today?');
}