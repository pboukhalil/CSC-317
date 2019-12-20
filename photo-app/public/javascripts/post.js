$(document).ready(function(){
	$('#submit').click(function () {
		var title = $('#title').val();
		var description = $('#description').val();
		var url = $('#url').val();
		$.ajax({
			type:'post',
			url:'./posts/new',
			dataType:'JSON',
			data:{
				title:title,
				description:description,
				url:url
			},
			success:function(data){
				if (data && data.code === '1') {
					return alert(data.msg);
				}
				window.location.href = '/';
			}
		});
	});
});