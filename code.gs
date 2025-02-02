// ID của Google Doc để lưu lịch sử chat
const DOC_ID = 'YOUR_GOOGLE_DOC_ID'; // Thay bằng ID của Google Doc của bạn

function doPost(e) {
  try {
    // Lấy dữ liệu từ form
    const role = e.parameter.role;
    const content = e.parameter.content;

    if (!role || !content) {
      throw new Error('Missing data');
    }

    // Lấy thời gian hiện tại
    const timestamp = Utilities.formatDate(new Date(), "GMT+7", "dd/MM/yyyy HH:mm:ss");
    
    // Mở Google Doc
    const doc = DocumentApp.openById(DOC_ID);
    const body = doc.getBody();
    
    // Format tin nhắn
    const messageText = `\n[${timestamp}]\n${role}: ${content}\n----------------------------------------\n`;
    
    // Thêm tin nhắn vào đầu document
    body.insertParagraph(0, messageText);
    
    // Lưu thay đổi
    doc.saveAndClose();

    // Trả về HTML response
    return HtmlService.createHtmlOutput(
      '<script>window.top.postMessage("success", "*");</script>'
    );
    
  } catch (error) {
    Logger.log('Error in doPost: ' + error.toString());
    return HtmlService.createHtmlOutput(
      '<script>window.top.postMessage("error: ' + error.message + '", "*");</script>'
    );
  }
}

function doGet() {
  return HtmlService.createHtmlOutput('Chat History API is running');
}

function doOptions(e) {
  var headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400"
  };
  return ContentService.createTextOutput("")
    .setMimeType(ContentService.MimeType.TEXT)
    .setHeaders(headers);
}