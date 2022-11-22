import lombok.extern.slf4j.Slf4j;
import org.apache.catalina.LifecycleException;
import org.apache.catalina.startup.Tomcat;

import java.io.File;
import io.sentry.Sentry;
import java.lang.Exception;
import io.sentry.ITransaction;
import io.sentry.SpanStatus;

@Slf4j

public class Main {

    public static void main(String[] args) {
        Sentry.init(options -> {
            options.setDsn("https://46139fe6db6b4681aa7057f566799439@o4504162380808192.ingest.sentry.io/4504198685261824");
            // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
            // We recommend adjusting this value in production.
            options.setTracesSampleRate(1.0);
            // When first trying Sentry it's good to see what the SDK is doing:
            options.setDebug(true);
        });

        System.err.println("Hiberte " + System.getenv("devopse22user") + "hibernate.connection.password" + System.getenv("devopse22pass"));
        Tomcat tomcat = new Tomcat();
        tomcat.setBaseDir("temp");
        String port = System.getenv("DevOpsPort");
        port = port !=null ? port:"8080";
        tomcat.setPort(Integer.parseInt(port));
        tomcat.getConnector();
        tomcat.addWebapp("",new
                File("src/main/webapp").getAbsolutePath());

        ITransaction transaction = Sentry.startTransaction("tomcat", "task");
        try {
            tomcat.start();
            tomcat.getServer().await();
        } catch (LifecycleException e) {
                throw new RuntimeException(e);
        } catch (Exception e) {
            transaction.setThrowable(e);
            transaction.setStatus(SpanStatus.INTERNAL_ERROR);
            throw e;
        } finally {
            transaction.finish();
        }
    }
}
