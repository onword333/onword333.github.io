$(function(){
    function setEqualHeight(columns) {
        var tallestcolumn = 0;
        columns.each(
            function() {
                var currentHeight = $(this).height();
                if(currentHeight > tallestcolumn) {
                    tallestcolumn = currentHeight;
                }
            }
        );
        columns.height(tallestcolumn);
    }
    setEqualHeight($(".c-card"));
});