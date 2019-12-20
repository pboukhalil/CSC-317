$(document).ready(function(){
	$('#post-comment').click(function () {
		var id = $('#image-id').val();
		var comment = $('#comment').val();
		$.ajax({
			type:'post',
			url:'/posts/comment/new',
			dataType:'JSON',
			data:{
				id:id,
				content:comment
			},
			success:function(data){
				if (data && data.code === '1') {
					return alert(data.msg);
				}
				window.location.reload();
			}
		});
	});
});