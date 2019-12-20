$(document).ready(function(){
	$('#signin').click(function () {
		var email = $('#email').val();
		var password = $('#password').val();
		$.ajax({
			type:'post',
			url:'./users/signin',
			dataType:'JSON',
			data:{
				email:email,
				password:password
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